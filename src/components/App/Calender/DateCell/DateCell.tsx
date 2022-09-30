/**
 * カレンダー - 日
 */
import type React from "react";
import { memo, useEffect, useRef } from "react";
import {
  Box,
  Text,
  useDisclosure,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import type { Schedule } from "~/components/App";
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

export const DateCell: React.FC<Props> = memo(
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

    // 「新規作成...」のref
    const creatingScheduleRef = useRef<HTMLParagraphElement>(null);

    /**
     * 予定作成ポップオーバーを開いた時、
     * 「新規作成...」を表示させるために、
     * 予定一覧のスクロールを一番下まで下げる
     */
    useEffect(() => {
      if (isOpenAddSchedulePopover && creatingScheduleRef.current) {
        creatingScheduleRef.current.scrollIntoView();
      }
    }, [isOpenAddSchedulePopover]);

    return (
      <Box
        sx={{
          height: "100%",
          padding: isToday ? "2px 5px 5px 5px" : "5px",
          borderTop: isToday ? "3px solid #57ab65" : "",
        }}
      >
        {/* 日付 */}
        <Text
          onClick={openAddSchedulePopover}
          sx={{
            height: "24px",
            textAlign: "left",
            fontSize: "16px",
            color: isToday ? "#57ab65" : "#999",
          }}
        >
          <span>{date.date}日</span>
        </Text>

        <Grid
          templateRows="auto 1fr"
          sx={{
            height: "100px",
          }}
        >
          {/* 登録済み予定一覧 */}
          <GridItem>
            <VStack
              spacing="0"
              sx={{
                maxHeight: "100px",
                padding: "0 2px",
                overflowY: "auto",
                gap: "4px",
              }}
            >
              {/* 登録済み予定ボタン */}
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

              {/* 予定作成ポップオーバー */}
              {isOpenAddSchedulePopover ? (
                <InputSchedulePopover
                  isOpen={isOpenAddSchedulePopover}
                  onClose={closeAddSchedulePopover}
                  popoverOpenDate={date}
                  schedule={null}
                  addSchedule={addSchedule}
                >
                  <Text
                    ref={creatingScheduleRef}
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
                    新規作成...
                  </Text>
                </InputSchedulePopover>
              ) : null}
            </VStack>
          </GridItem>

          {/**
           * 登録済み予定一覧の下残りの領域
           * 押下時に予定作成ポップオーバーを開く
           */}
          <GridItem onClick={openAddSchedulePopover} />
        </Grid>
      </Box>
    );
  }
);
