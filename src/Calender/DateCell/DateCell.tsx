/**
 * カレンダー - 日
 */
import React from "react";
import { Box, Text, useDisclosure, Button, VStack } from "@chakra-ui/react";
import type { Schedule } from "~/App";
import { InputSchedulePopover } from "./InputSchedulePopover";
import { ScheduleButton } from "./ScheduleButton";

type Props = {
  date: {
    year: number;
    month: number;
    date: number;
  }; // 表示日付
  isToday: boolean; // 現在日か
  scheduleList: Schedule[];
  // 予定の追加処理
  addSchedule: (newSchedule: Omit<Schedule, "id">) => void;
  // 予定の削除処理
  deleateSchedule: (targetId: number) => void;
  // 予定の更新処理
  updateSchedule: (newSchedule: Schedule) => void;
};

export const DateCell: React.FC<Props> = React.memo(
  ({
    date,
    isToday,
    scheduleList,
    addSchedule,
    deleateSchedule,
    updateSchedule,
  }) => {
    // 予定作成ポップオーバーの表示状態
    const {
      isOpen: isOpenAddSchedulePopover,
      onOpen: openAddSchedulePopover,
      onClose: closeAddSchedulePopover,
    } = useDisclosure();

    return (
      <Box
        sx={{
          height: "100%",
          padding: isToday ? "2px 5px 5px 5px" : "5px",
          borderTop: isToday ? "3px solid #57ab65" : "",
          _hover: {
            ".makingSchedule": {
              display: "block",
            },
          },
        }}
      >
        <Text
          sx={{
            width: "100%",
            height: "24px",
            textAlign: "left",
            fontSize: "16px",
            color: isToday ? "#57ab65" : "#999",
          }}
        >
          <span>{date.date}日</span>
        </Text>
        <VStack
          sx={{
            width: "100%",
            height: "100px",
            padding: "2px",
            overflowY: "auto",
          }}
        >
          {/* 予定作成ポップオーバー */}
          <InputSchedulePopover
            isOpen={isOpenAddSchedulePopover}
            onClose={closeAddSchedulePopover}
            popoverOpenDate={date}
            schedule={null}
            addSchedule={addSchedule}
          >
            <Button
              onClick={openAddSchedulePopover}
              className="makingSchedule"
              sx={{
                display: isOpenAddSchedulePopover ? "block" : "none",
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
                新規作成...
              </Text>
            </Button>
          </InputSchedulePopover>

          {/* 登録済み予定一覧 */}
          {scheduleList.map((schedule) => {
            return (
              <ScheduleButton
                key={schedule.id}
                schedule={schedule}
                deleateSchedule={deleateSchedule}
                updateSchedule={updateSchedule}
              />
            );
          })}
        </VStack>
      </Box>
    );
  }
);
