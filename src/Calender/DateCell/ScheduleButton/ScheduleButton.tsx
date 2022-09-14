/**
 * 登録済み予定ボタン
 */
import React from "react";
import { Text, useDisclosure, Button } from "@chakra-ui/react";
import type { Schedule } from "~/App";
import { ScheduleDetailPopover } from "./ScheduleDetailPopover";

type Props = {
  schedule: Schedule;
  // 予定の削除処理
  deleateSchedule: (targetId: number) => void;
  // 予定の更新処理
  updateSchedule: (newSchedule: Schedule) => void;
};

export const ScheduleButton: React.FC<Props> = React.memo(
  ({ schedule, deleateSchedule, updateSchedule }) => {
    // 予定詳細ポップオーバーの表示状態
    const {
      isOpen: isOpenScheduleDetailPopover,
      onOpen: openScheduleDetailPopover,
      onClose: closeScheduleDetailPopover,
    } = useDisclosure();

    return (
      // 予定作成ポップオーバー
      <ScheduleDetailPopover
        key={schedule.id}
        isOpen={isOpenScheduleDetailPopover}
        onClose={closeScheduleDetailPopover}
        schedule={schedule}
        deleateSchedule={deleateSchedule}
        updateSchedule={updateSchedule}
      >
        <Button
          onClick={openScheduleDetailPopover}
          sx={{
            display: "block",
            width: "100%",
            height: "24px",
            padding: "2px 4px",
            backgroundColor: "#94d4a8",
          }}
        >
          <Text
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "16px",
              color: "#fff",
            }}
          >
            {schedule.title}
          </Text>
        </Button>
      </ScheduleDetailPopover>
    );
  }
);
