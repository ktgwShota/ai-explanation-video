import {
  DEFAULT_SPEAKER_SETTINGS,
  INTONATION_OPTIONS,
  PITCH_OPTIONS,
  SPEAKERS,
  SPEED_OPTIONS,
} from "@/constants/voicevox";
import { useAuth } from "@/hooks/useAuth";
import {
  AllSpeakerSettings,
  SpeakerId,
  SpeakerSettings,
} from "@/types/voicevox";
import { PlayCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

export function UserSpeakerSettings(props: {
  ref: React.MutableRefObject<{ handleSave: () => Promise<void> } | null>;
}) {
  const {
    userSpeakerSettings: rawUserSpeakerSettings,
    fetchUserSpeakerSettings,
  } = useAuth();
  if (!rawUserSpeakerSettings) {
    throw new Error("Must not happen: 認証ユーザーのみ表示できるページです");
  }
  // 初期データを整形
  const userSpeakerSettings = rawUserSpeakerSettings.reduce(
    (acc: any, setting: any) => {
      acc[setting.speaker_id] = {
        speedScale: setting.speed_scale,
        pitchScale: setting.pitch_scale,
        intonationScale: setting.intonation_scale,
      };
      return acc;
    },
    {}
  );

  const [selectedSpeakerId, setSelectedSpeakerId] = useState<SpeakerId>(3);
  const [speakerSettings, setSpeakerSettings] =
    useState<AllSpeakerSettings>(userSpeakerSettings);
  const selectedSpeakerSettings =
    speakerSettings[selectedSpeakerId] ??
    DEFAULT_SPEAKER_SETTINGS[selectedSpeakerId];

  // TODO: 変更前のデータを保持しておき、変更後のデータと比較して、変更があった場合のみ保存するようにしたい <- リリース後にデータベースの無料枠を超過しそうであれば実装する
  const handleSave = async () => {
    // TODO: Supabase 復旧後に有効化
    // const savePromises = Object.entries(speakerSettings).map(
    //   ([id, settings]) => {
    //     if (!id || !settings) return Promise.resolve();
    //
    //     return fetch("/api/supabase", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         type: "upsertUserSpeakerSettings",
    //         data: {
    //           speakerId: Number(id),
    //           speedScale: settings.speedScale,
    //           pitchScale: settings.pitchScale,
    //           intonationScale: settings.intonationScale,
    //         },
    //       }),
    //     });
    //   }
    // );
    //
    // try {
    //   await Promise.all(savePromises);
    //   await fetchUserSpeakerSettings();
    // } catch (error) {
    //   throw new Error(`音声設定の保存に失敗しました: ${error}`);
    // }
  };

  useEffect(() => {
    if (props.ref) {
      props.ref.current = { handleSave };
    }
  }, [props.ref, handleSave]);

  const handleSettingChange = (
    settingKey: keyof SpeakerSettings,
    value: number
  ) => {
    setSpeakerSettings((prevSettings) => ({
      ...prevSettings,
      [selectedSpeakerId]: {
        ...(prevSettings[selectedSpeakerId] ??
          DEFAULT_SPEAKER_SETTINGS[selectedSpeakerId]),
        [settingKey]: value,
      },
    }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          p: 1.5,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Select
            value={selectedSpeakerId}
            onChange={(e) => setSelectedSpeakerId(e.target.value)}
            variant="standard"
            disableUnderline
            sx={{
              minWidth: 80,
              fontSize: "14px",
              "& .MuiSelect-select": { padding: "1px 0 0 0 " },
            }}
          >
            {SPEAKERS.map((speaker) => (
              <MenuItem
                key={speaker.id}
                value={speaker.id}
                sx={{ fontSize: "14px" }}
              >
                {speaker.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
        />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="text.primary" sx={{ fontSize: "14px", mr: 1 }}>
            再生
          </Typography>
          <IconButton
            color="inherit"
            size="small"
            sx={{ "& .MuiSvgIcon-root": { width: 20, height: 20 } }}
          >
            <PlayCircleOutline />
          </IconButton>
        </Box>
      </Box>

      <Box>
        {selectedSpeakerSettings && (
          <>
            <SettingsSelector
              label="話速"
              options={SPEED_OPTIONS[selectedSpeakerId]}
              value={selectedSpeakerSettings.speedScale}
              onChange={(value) => handleSettingChange("speedScale", value)}
            />
            <SettingsSelector
              label="音高"
              options={PITCH_OPTIONS[selectedSpeakerId]}
              value={selectedSpeakerSettings.pitchScale}
              onChange={(value) => handleSettingChange("pitchScale", value)}
            />
            <SettingsSelector
              label="抑揚"
              options={INTONATION_OPTIONS[selectedSpeakerId]}
              value={selectedSpeakerSettings.intonationScale}
              onChange={(value) =>
                handleSettingChange("intonationScale", value)
              }
            />
          </>
        )}
      </Box>
    </Box>
  );
}

function SettingsSelector({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Record<string, number>;
  value: number;
  onChange: (value: number) => void;
}) {
  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ ml: "1px", mb: 0.5, fontSize: "14px" }}
      >
        {label}
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleToggleChange}
        aria-label={label}
        fullWidth
        sx={{ "& .MuiToggleButtonGroup-grouped": { fontSize: "14px" } }}
      >
        {Object.entries(options).map(([key, val]) => (
          <ToggleButton key={String(val)} value={val} aria-label={key}>
            {key}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
