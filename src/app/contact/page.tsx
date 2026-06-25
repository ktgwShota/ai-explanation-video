// "use client";

// import {
//   Box,
//   FormControl,
//   TextField,
//   Button,
//   Typography,
//   Alert,
// } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";
// import { useState } from "react";

// type ContactFormInput = {
//   name: string;
//   email: string;
//   message: string;
// };

export const runtime = 'edge';

// export default function ContactPage() {
//   const { control, handleSubmit, formState, reset } =
//     useForm<ContactFormInput>();
//   const [ isDarkTheme] = useThemeColor();
//   const [submitted, setSubmitted] = useState(false);

//   const onSubmit = (data: ContactFormInput) => {
//     console.log("送信内容:", data);
//     setSubmitted(true);
//     reset();
//   };

//   const placeholderColor = isDarkTheme ? "#aaa" : "#666";

//   const commonTextFieldStyle = (theme:any) => ({
//     // 通常時の枠線の色
//     "& .MuiOutlinedInput-notchedOutline": {
//       // ダークモードの時はグレーに、ライトモードの時はMUIのデフォルトdivider色を使う
//       borderColor: theme.palette.mode === 'dark' ? "#808080" : theme.palette.divider,
//     },
//     // ホバー時の枠線の色
//     "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: theme.palette.mode === 'dark' ? "#e2e8f0" : "#888",
//       borderWidth: "1px",
//     },
//     // フォーカス時の枠線の色（これは元のままでOK）
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: theme.palette.primary.main,
//       borderWidth: "1px",
//     },
//     // プレースホルダーの色
//     "& input::placeholder, & textarea::placeholder": {
//       color: theme.palette.mode === 'dark' ? "#A9A9A9" : "#707070", // 例：ダーク/ライトで色を変更
//       opacity: 1,
//     },
//   });

//   return (
//     <main className="max-w-3xl mx-auto px-6 pb-6 flex-grow">
//       <Box
//         component="form"
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}
//       >
//         <Typography variant="h4" component="h1" textAlign="center">
//           お問い合わせ
//         </Typography>

//         {submitted && (
//           <Alert severity="success">送信ありがとうございました！</Alert>
//         )}

//         {/* お名前 */}
//         <FormControl fullWidth required>
//           <Controller
//             name="name"
//             control={control}
//             rules={{ required: "お名前は必須です。" }}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="お名前 *"
//                 placeholder="山田 太郎"
//                 size="medium"
//                 error={!!formState.errors.name}
//                 helperText={formState.errors.name?.message}
//                 sx={{
//                   ...commonTextFieldStyle,
//                   width: "100%",
//                   "& .MuiOutlinedInput-root": {
//                     width: "100%",
//                   },
//                 }}
//                 InputProps={{
//                   sx: {
//                     input: {
//                       textAlign: "center",
//                       color: "inherit",
//                       "::placeholder": {
//                         color: placeholderColor,
//                       },
//                     },
//                   },
//                 }}
//                 slotProps={{
//                   inputLabel: {
//                     sx: { color: "inherit" },
//                     shrink: true,
//                   },
//                 }}
//               />
//             )}
//           />
//         </FormControl>

//         {/* メールアドレス */}
//         <FormControl fullWidth required>
//           <Controller
//             name="email"
//             control={control}
//             rules={{ required: "メールアドレスは必須です。" }}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="メールアドレス *"
//                 placeholder="example@example.com"
//                 size="medium"
//                 type="email"
//                 error={!!formState.errors.email}
//                 helperText={formState.errors.email?.message}
//                 sx={{
//                   ...commonTextFieldStyle,
//                   width: "100%",
//                   "& .MuiOutlinedInput-root": {
//                     width: "100%",
//                   },
//                 }}
//                 InputProps={{
//                   sx: {
//                     input: {
//                       textAlign: "center",
//                       color: "inherit",
//                       "::placeholder": {
//                         color: placeholderColor,
//                       },
//                     },
//                   },
//                 }}
//                 slotProps={{
//                   inputLabel: {
//                     sx: { color: "inherit" },
//                     shrink: true,
//                   },
//                 }}
//               />
//             )}
//           />
//         </FormControl>

//         {/* お問い合わせ内容 */}
//         <FormControl fullWidth required>
//           <Controller
//             name="message"
//             control={control}
//             rules={{ required: "お問い合わせ内容は必須です。" }}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="お問い合わせ内容 *"
//                 placeholder="ご質問やご要望を入力してください"
//                 multiline
//                 rows={5}
//                 error={!!formState.errors.message}
//                 helperText={formState.errors.message?.message}
//                 sx={{
//                   ...commonTextFieldStyle,
//                   width: "100%",
//                   "& .MuiOutlinedInput-root": {
//                     width: "100%",
//                   },
//                 }}
//                 InputProps={{
//                   sx: {
//                     textarea: {
//                       textAlign: "center",
//                       color: "inherit",
//                       "::placeholder": {
//                         color: placeholderColor,
//                       },
//                     },
//                   },
//                 }}
//                 slotProps={{
//                   inputLabel: {
//                     sx: { color: "inherit" },
//                     shrink: true,
//                   },
//                 }}
//               />
//             )}
//           />
//         </FormControl>

//         <Box textAlign="center" mt={2}>
//           <Button variant="contained" type="submit">
//             送信
//           </Button>
//         </Box>
//       </Box>
//     </main>
//   );
// }


export default function ContactPage() {
  return (
    <div>
      <h1>お問い合わせ</h1>
    </div>
  );
}