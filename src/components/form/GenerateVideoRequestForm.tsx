"use client";

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { useForm, Controller, Form, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GenerateVideoFormInput,
  generateVideoFormSchema,
} from "../../schemas/generateVideoFormSchema";
import { AnimatePresence, motion } from "framer-motion";
import VideoPlayerDialog from "../dialog/VideoPlayerDialog";
import VideoPlayerAndLoading from "../VideoPlayer";
import SubmitButton from "./SubmitButton";
import { useDialogStore } from "@/store/dialogStore";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAuth } from "@/hooks/useAuth";
import { useRemotion } from "@/hooks/useRemotion";
import { generateScript } from "@/services/video/generateScript";
import { SPEAKER_IDS } from "@/constants/voicevox";
import { getSpeakerNameById } from "@/utils/voicevox";
import generateVideoFromScript from "@/services/video/generateVideoFromScript";
// import {
//   checkUserApiUsage,
//   increaseCountTodayFromUserApiUsage,
// } from "@/services/supabase/apiUsage";
import { useAbortController } from "@/hooks/useAbortController";

export default function GenerateVideoRequestForm({
  className,
}: {
  className?: string;
}) {
  const { setIsVideoPlayerDialogOpen } = useDialogStore();
  const { setVideoUrl, setProgress, resetRemotionStore } = useRemotion();
  const { getSignal } = useAbortController();
  const form = useForm({ resolver: zodResolver(generateVideoFormSchema) });

  const onSubmit: SubmitHandler<GenerateVideoFormInput> = async (formData) => {
    resetRemotionStore();
    form.clearErrors("root");
    // NOTE: 待機時間にユーザーが離脱を防ぐためのローディングアニメーションに使用。実際の処理の進捗とは無関係
    setProgress(99);

    const signal = getSignal();

    try {
      const { theme, mainSpeakerId, subSpeakerId } = formData;

      const speakerIds = {
        mainSpeakerId,
        subSpeakerId,
      };

      // TODO: チェックしたデータは useAuthStore に保存しておき、上限に達している場合は onSubmit をクリックできないようにする
      // TODO: 処理に数秒かかるので、チェックするタイミングはここではなく、onSubmit をクリックする前に取得して起きたい
      // await checkUserApiUsage({ signal });

      const { sessionId, videoContent } = await generateScript(
        theme,
        speakerIds,
        { signal }
      );

      console.log(videoContent);

      const { hlsPlaylistUrl } = generateVideoFromScript(
        sessionId,
        videoContent,
        speakerIds,
        {
          signal,
        }
      );

      console.log(hlsPlaylistUrl);

      const videoUrl = await hlsPlaylistUrl;
      if (!videoUrl) {
        throw new Error(
          "動画の生成に失敗しました。音声またはレンダリング処理でエラーが発生した可能性があります。"
        );
      }

      setVideoUrl(videoUrl);
      // TODO: Edge 環境で API 使用量カウントが安定するまで無効化
      // await increaseCountTodayFromUserApiUsage({ signal });
    } catch (error: any) {
      if (error.name === "AbortError") {
        form.setError("root", {
          type: "manual",
          message: error.message || "AbortError: 不明なエラーが発生しました",
        });
        return;
      }
      form.setError("root", {
        type: "manual",
        message: error.message || "Error: 不明なエラーが発生しました",
      });
    }
  };

  return (
    <Form control={form.control} className={`flex flex-col gap-5 ${className}`}>
      <ThemeForm form={form} />

      <Divider />

      <SpeakerForm form={form} />

      <Divider />

      <AnimatePresence>
        <motion.div
          layoutId="generate-button"
          initial={{ width: 110 }}
          animate={{ width: 110 }}
          exit={{ width: 110 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
            gap: 20,
          }}
        >
          <Tooltip
            title={
              !form.formState.isValid
                ? "テーマを入力してください"
                : form.formState.isSubmitting
                ? "送信中..."
                : "" // TODO: 本日使用できるAPIの残り回数をがない場合を追加する
            }
            disableHoverListener={
              form.formState.isValid && !form.formState.isSubmitting
            }
            disableFocusListener={
              form.formState.isValid && !form.formState.isSubmitting
            }
            disableTouchListener={
              form.formState.isValid && !form.formState.isSubmitting
            }
          >
            {/* NOTE:　　Disabled の Button にツールチップを表示するためには span でラップする必要がある ref: https://mui.com/material-ui/react-tooltip/#disabled-elements */}
            <span className="cursor-not-allowed">
              <SubmitButton
                text="動画を生成"
                onClick={() => {
                  form.handleSubmit(onSubmit)();
                  setIsVideoPlayerDialogOpen(true);
                }}
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                sx={(theme: any) => ({
                  width: 110,
                  height: 46,
                  boxShadow: "none",
                  "&.Mui-disabled, &.Mui-disabled.MuiButtonBase-root, &.Mui-disabled button, &.Mui-disabled.MuiButton-root":
                    {
                      opacity: 1,
                    },
                })}
              />
            </span>
          </Tooltip>
        </motion.div>

        <VideoPlayerDialog
          key="custom-dialog" // NOTE: key を指定しないとコンソールにエラーが出る
          layoutId="generate-button"
          PaperComponent={motion.div}
        >
          <VideoPlayerAndLoading formError={form.formState.errors} />
        </VideoPlayerDialog>
      </AnimatePresence>

      <Divider />
    </Form>
  );
}

function ThemeForm({
  form,
}: {
  form: ReturnType<typeof useForm<GenerateVideoFormInput>>;
}) {
  const { control, formState } = form;
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <FormControl fullWidth size="medium">
        <Controller
          name="theme"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="テーマ"
              placeholder="React のライフサイクルとは？"
              size="medium"
              sx={(theme) => ({
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    theme.palette.mode === "dark" ? "#909090" : undefined,
                },

                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    // borderColor:
                    //   theme.palette.mode === "dark" ? "#e2e8f0" : "#888",
                    borderWidth: "1px",
                  },
                textAlign: "center",
              })}
              InputProps={{
                style: { color: "inherit" },
                sx: {
                  input: {
                    textAlign: "center",
                  },
                },
              }}
              slotProps={{
                inputLabel: {
                  sx: { color: "inherit" },
                  shrink: true,
                },
              }}
              error={!!formState.errors.theme}
            />
          )}
        />
      </FormControl>
    </Box>
  );
}

function SpeakerForm({
  form,
}: {
  form: ReturnType<typeof useForm<GenerateVideoFormInput>>;
}) {
  const user = useAuth();
  const { control, watch, setValue } = form;
  const currentMainSpeakerId = watch("mainSpeakerId");
  const currentSubSpeakerId = watch("subSpeakerId");

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {/* メイン音声 */}
        <Box display="flex" flexDirection="column" flex={1}>
          <FormControl fullWidth size="medium">
            <Controller
              name="mainSpeakerId"
              control={control}
              defaultValue={SPEAKER_IDS[0]}
              render={({ field }) => (
                <>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <InputLabel
                      id="main-speaker-name-label"
                      shrink
                      sx={{ color: "inherit" }}
                    >
                      <Tooltip
                        title="進行・解説を行うキャラクターを選択してください"
                        placement="top"
                      >
                        <span className="flex items-center">
                          メイン音声
                          <InfoOutlinedIcon
                            fontSize={"medium"}
                            sx={{
                              color: "#93c5fd",
                              ml: "3px",
                              pr: "3px",
                              pb: "1px",
                            }}
                          />
                        </span>
                      </Tooltip>
                    </InputLabel>
                  </Box>

                  <Select
                    {...field}
                    labelId="main-speaker-name-label"
                    label="メイン音声"
                    sx={(theme) => ({
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#808080" : undefined,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#e2e8f0" : "#888",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                      },
                      "& .MuiOutlinedInput-notchedOutline legend": {
                        paddingRight: 2,
                      },
                      "& .MuiSelect-icon": {
                        color: theme.palette.mode === "dark" ? "#e2e8f0" : "#666",
                      },
                      textAlign: "center",
                      color: "inherit",
                    })}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiList-root": {
                            padding: 1,
                          },
                        },
                      },
                    }}
                    onChange={(event) => {
                      const selectedMainSpeakerId = event.target.value;
                      if (selectedMainSpeakerId === currentSubSpeakerId) {
                        setValue("subSpeakerId", currentMainSpeakerId, {
                          shouldValidate: true,
                        });
                      }
                      field.onChange(selectedMainSpeakerId);
                    }}
                  >
                    {SPEAKER_IDS.map((speakerId) => {
                      return (
                        <MenuItem
                          key={speakerId}
                          value={speakerId}
                          sx={{ p: 1.5, justifyContent: "center" }}
                        >
                          {getSpeakerNameById(speakerId)}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </>
              )}
            />
          </FormControl>
        </Box>

        <Box display="flex" flexDirection="column" flex={1}>
          <FormControl fullWidth size="medium">
            <Controller
              name="subSpeakerId"
              control={control}
              defaultValue={SPEAKER_IDS[1]}
              render={({ field }) => (
                <>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <InputLabel
                      id="sub-speaker-label"
                      shrink
                      sx={{ color: "inherit" }}
                    >
                      <Tooltip
                        title="補助・質問を行うキャラクターを選択してください"
                        placement="top"
                      >
                        <span className="flex items-center">
                          サブ音声
                          <InfoOutlinedIcon
                            fontSize={"medium"}
                            sx={{
                              color: "#93c5fd",
                              ml: "3px",
                              pr: "3px",
                              pb: "1px",
                            }}
                          />
                        </span>
                      </Tooltip>
                    </InputLabel>
                  </Box>
                  <Select
                    {...field}
                    labelId="sub-speaker-label"
                    label="サブ音声"
                    sx={(theme) => ({
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#808080" : "",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#e2e8f0" : "#888",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                      },
                      "& .MuiOutlinedInput-notchedOutline legend": {
                        paddingRight: 2,
                      },
                      "& .MuiSelect-icon": {
                        color: theme.palette.mode === "dark" ? "#e2e8f0" : "#666",
                      },
                      textAlign: "center",
                      color: "inherit",
                    })}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiList-root": {
                            padding: 1,
                          },
                        },
                      },
                    }}
                    onChange={(event) => {
                      const selectedSubSpeakerId = event.target.value;
                      if (selectedSubSpeakerId === currentMainSpeakerId) {
                        setValue("mainSpeakerId", currentSubSpeakerId, {
                          shouldValidate: true,
                        });
                      }
                      field.onChange(selectedSubSpeakerId);
                    }}
                  >
                    {SPEAKER_IDS.map((speakerId) => {
                      return (
                        <MenuItem
                          key={speakerId}
                          value={speakerId}
                          sx={{ p: 1.5, justifyContent: "center" }}
                        >
                          {getSpeakerNameById(speakerId)}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </>
              )}
            />
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
