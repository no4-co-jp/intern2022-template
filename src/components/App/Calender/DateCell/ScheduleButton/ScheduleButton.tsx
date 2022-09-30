/**
 * 登録済み予定ボタン
 */
import React, { useCallback } from "react";
import { Text, useDisclosure, Button } from "@chakra-ui/react";
import type { Schedule } from "~/components/App";
import { ScheduleDetailPopover } from "./ScheduleDetailPopover";
import { InputSchedulePopover } from "~/components/App/Calender/DateCell/InputSchedulePopover";

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

    // 予定編集ポップオーバーの表示状態
    const {
      isOpen: isOpenEditSchedulePopover,
      onOpen: openEditSchedulePopover,
      onClose: closeEditSchedulePopover,
    } = useDisclosure();

    // 予定詳細ポップオーバー - 編集ボタン押下時
    const handleClickEditButton = useCallback(() => {
      // 予定詳細ポップオーバーを閉じる
      closeScheduleDetailPopover();

      // 予定編集ポップオーバーを開く
      openEditSchedulePopover();
    }, [closeScheduleDetailPopover, openEditSchedulePopover]);

    // 予定編集ポップオーバー - 閉じるボタン押下時
    const handleCloseEditSchedulePopover = useCallback(() => {
      // 予定編集ポップオーバーを閉じる
      closeEditSchedulePopover();

      // 予定詳細ポップオーバーを開く
      openScheduleDetailPopover();
    }, [closeEditSchedulePopover, openScheduleDetailPopover]);

    return (
      <>
        {!isOpenEditSchedulePopover ? (
          // 予定詳細ポップオーバー
          <ScheduleDetailPopover
            key={schedule.id}
            isOpen={isOpenScheduleDetailPopover}
            onClose={closeScheduleDetailPopover}
            schedule={schedule}
            onClickEditBitton={handleClickEditButton}
            deleateSchedule={deleateSchedule}
          >
            <Button
              onClick={openScheduleDetailPopover}
              sx={{
                display: "block",
                width: "100%",
                height: "24px",
                padding: "2px 4px",
                borderRadius: "4px",
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
        ) : (
          // 予定編集ポップオーバー
          <InputSchedulePopover
            key={schedule.id}
            isOpen={isOpenEditSchedulePopover}
            onClose={handleCloseEditSchedulePopover}
            schedule={schedule}
            deleateSchedule={deleateSchedule}
            updateSchedule={updateSchedule}
          >
            <Text
              sx={{
                width: "100%",
                height: "24px",
                padding: "2px 4px",
                textAlign: "left",
                borderRadius: "4px",
                backgroundColor: "#94d4a8",
                fontWeight: "normal",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              {schedule.title}
            </Text>
          </InputSchedulePopover>
        )}
      </>
    );
  }
);
