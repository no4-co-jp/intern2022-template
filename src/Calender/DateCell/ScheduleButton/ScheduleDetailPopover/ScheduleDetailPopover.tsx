/**
 * 予定詳細ポップオーバー
 */
import React, { useCallback, useMemo } from "react";
import {
  Box,
  Text,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  HStack,
  PopoverTrigger,
  IconButton,
  Flex,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import type { Schedule } from "~/App";
import {
  BiCalendarEvent,
  BiEditAlt,
  BiMessageSquareDetail,
  BiText,
  BiTime,
  BiTrash,
  BiX,
} from "react-icons/bi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // PopoverTrigger内の要素
  schedule: Schedule;
  // 予定の削除処理
  deleateSchedule: (targetId: number) => void;
  // 予定の更新処理
  updateSchedule: (newSchedule: Schedule) => void;
};

export const ScheduleDetailPopover: React.FC<Props> = React.memo(
  ({
    isOpen,
    onClose,
    children,
    schedule,
    deleateSchedule,
    updateSchedule,
  }) => {
    // タイトル
    const title = useMemo(() => {
      return schedule.title;
    }, [schedule]);

    // 日付 yyyy/mm/dd形式
    const date = useMemo(() => {
      return schedule.date.replaceAll("-", "/");
    }, [schedule]);

    // 開始時刻 hh:MM形式
    const startTime = useMemo(() => {
      return schedule.startTime === "" ? "--:--" : schedule.startTime;
    }, [schedule]);

    // 終了時刻 hh:MM形式
    const endTime = useMemo(() => {
      return schedule.endTime === "" ? "--:--" : schedule.endTime;
    }, [schedule]);

    // メモ
    const memo = useMemo(() => {
      return schedule.memo;
    }, [schedule]);

    // 閉じるボタン押下時
    const handleClickCloseButton = useCallback(() => {
      // ポップオーバーを閉じる
      onClose();
    }, [onClose]);

    // 編集ボタン押下時
    const handleClickEditButton = useCallback(() => {
      return;
    }, []);

    // 削除ボタン押下時
    const handleClickDeleateButton = useCallback(() => {
      // 予定を削除
      deleateSchedule(schedule.id);
      // ポップオーバーを閉じる
      handleClickCloseButton();
    }, [deleateSchedule, handleClickCloseButton, schedule]);

    // ポップオーバー領域外クリック時
    const handleClickOutsidePopover = useCallback(() => {
      // ポップオーバーを閉じる
      handleClickCloseButton();
    }, [handleClickCloseButton]);

    return (
      <>
        <Popover
          isOpen={isOpen}
          returnFocusOnClose={false}
          placement="right"
          closeOnBlur={false}
        >
          <PopoverTrigger>{children}</PopoverTrigger>
          <PopoverContent
            sx={{
              width: "300px",
              color: "#000",
            }}
          >
            <PopoverArrow />

            <PopoverHeader
              sx={{
                padding: "2px 8px",
              }}
            >
              <Flex
                sx={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text
                  sx={{
                    fontSize: "12px",
                    fontWeight: "normal",
                  }}
                >
                  予定の詳細
                </Text>
                <Spacer />

                {/* 編集ボタン */}
                <IconButton
                  aria-label="save"
                  icon={
                    <BiEditAlt
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  }
                  onClick={handleClickEditButton}
                  sx={{
                    width: "16px",
                    minWidth: "16px",
                    height: "16px",
                    marginLeft: "5px",
                    backgroundColor: "#fff",
                    color: "#999",
                  }}
                />

                {/* 削除ボタン */}
                <IconButton
                  aria-label="save"
                  icon={
                    <BiTrash
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  }
                  onClick={handleClickDeleateButton}
                  sx={{
                    width: "16px",
                    minWidth: "16px",
                    height: "16px",
                    marginLeft: "5px",
                    backgroundColor: "#fff",
                    color: "#999",
                  }}
                />

                {/* 閉じるボタン */}
                <IconButton
                  aria-label="save"
                  icon={
                    <BiX
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  }
                  onClick={handleClickCloseButton}
                  sx={{
                    width: "16px",
                    minWidth: "16px",
                    height: "16px",
                    marginLeft: "5px",
                    backgroundColor: "#fff",
                    color: "#999",
                  }}
                />
              </Flex>
            </PopoverHeader>

            <PopoverBody>
              <VStack
                sx={{
                  width: "100%",
                }}
              >
                {/* タイトル */}
                <HStack
                  sx={{
                    width: "100%",
                    paddingTop: "8px",
                  }}
                >
                  <BiText
                    style={{
                      width: "36px",
                      height: "16px",
                      padding: "0 10px",
                    }}
                  />
                  <Text>{title}</Text>
                </HStack>

                {/* 日時 */}
                <HStack
                  sx={{
                    width: "100%",
                    paddingTop: "8px",
                  }}
                >
                  <BiCalendarEvent
                    style={{
                      width: "36px",
                      height: "16px",
                      padding: "0 10px",
                    }}
                  />
                  <Text>{date}</Text>
                </HStack>

                <HStack
                  sx={{
                    width: "100%",
                    paddingTop: "8px",
                  }}
                >
                  <BiTime
                    style={{
                      width: "36px",
                      height: "16px",
                      padding: "0 10px",
                    }}
                  />
                  {/* 開始時刻 */}
                  <Text>{startTime}</Text>
                  <Text
                    sx={{
                      padding: "0 20px",
                    }}
                  >
                    -
                  </Text>
                  {/* 終了時刻 */}
                  <Text>{endTime}</Text>
                </HStack>

                {/* メモ */}
                <HStack
                  sx={{
                    width: "100%",
                    minHeight: "20px",
                    paddingTop: "8px",
                    alignItems: "start",
                  }}
                >
                  <BiMessageSquareDetail
                    style={{
                      width: "36px",
                      height: "16px",
                      padding: "0 10px",
                    }}
                  />
                  <Text
                    sx={{
                      width: "100%",
                      minHeight: "80px",
                    }}
                  >
                    {memo}
                  </Text>
                </HStack>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {/**
         * ポップオーバーが開いている間は、
         * 背景の操作をできないようにする
         */}
        {isOpen ? (
          <Box
            onClick={handleClickOutsidePopover}
            sx={{
              position: "absolute",
              zIndex: "5",
              top: "0px",
              left: "0px",
              width: "100vw",
              height: "100vh",
              backgroundColor: "#fff",
              opacity: "0.5",
            }}
          />
        ) : null}
      </>
    );
  }
);