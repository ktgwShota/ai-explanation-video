import {
  S3Client,
  HeadObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} が設定されていません`);
  }
  return value;
}

function createS3ForR2() {
  return new S3Client({
    region: "auto",
    endpoint: requireEnv("R2_ENDPOINT"),
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
}

function createS3ForAWS() {
  return new S3Client({
    region: process.env.AWS_REGION ?? "us-east-1",
    credentials: {
      accessKeyId: requireEnv("AWS_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("AWS_SECRET_ACCESS_KEY"),
    },
  });
}

// cloudflare では月1000万リクエストまで無料。リクエスト数が多い場合は別の方法を検討する
export async function waitForObjectByR2(
  bucketName: string,
  key: string,
  maxRetries = 30,
  intervalMs = 1000
) {
  const s3 = createS3ForR2();
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await s3.send(
        new HeadObjectCommand({ Bucket: bucketName, Key: key })
      );
      console.log("オブジェクトが利用可能になりました。");
      return;
    } catch (err: any) {
      if (err.name === "NotFound") {
        console.log(
          `オブジェクトがまだ存在しません。${
            intervalMs / 1000
          }秒後に再試行します。`
        );
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      } else {
        throw err;
      }
    }
  }
  throw new Error(
    "オブジェクトが指定された時間内に利用可能になりませんでした。"
  );
}

export async function getProgressJson(
  bucketName: string,
  key: string
): Promise<any> {
  const s3 = createS3ForAWS();
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const response = await s3.send(command);
  const stream = response.Body as ReadableStream;
  const text = await streamToString(stream);
  return JSON.parse(text);
}

// Node.js/Edge/Cloudflare Workersなど環境によってstreamの扱いは異なります
async function streamToString(stream: any): Promise<string> {
  // Node.jsの場合
  if (typeof stream.pipe === "function") {
    // @ts-ignore
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf-8");
  }
  // Web Streams APIの場合
  const reader = stream.getReader();
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);
  }
  return result;
}
