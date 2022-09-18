/**
 * 予定入力ポップオーバー (作成, 編集)
 */
import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Text,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  HStack,
  FormControl,
  Input,
  PopoverTrigger,
  Textarea,
  IconButton,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import type { Schedule } from "~/App";
import { BiSave, BiTrash, BiX } from "react-icons/bi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // PopoverTrigger内の要素
  popoverOpenDate?: {
    // 呼び出し元の日付
    year: number;
    month: number;
    date: number;
  };
  schedule: Schedule | null;
  // 予定の追加処理
  addSchedule?: (newSchedule: Omit<Schedule, "id">) => void;
  // 予定の削除処理
  deleateSchedule?: (targetId: number) => void;
  // 予定の更新処理
  updateSchedule?: (newSchedule: Schedule) => void;
};

export const InputSchedulePopover: React.FC<Props> = React.memo(
  ({
    isOpen,
    onClose,
    children,
    popoverOpenDate,
    schedule,
    addSchedule,
    deleateSchedule,
    updateSchedule,
  }) => {
    // 新規作成か
    const isAddNewSchedule = useMemo(() => {
      return !schedule;
    }, [schedule]);

    // タイトル
    const [title, setTitle] = useState<string>(schedule?.title ?? "");

    // 日付 yyyy-mm-dd形式
    const [date, setDate] = useState<string>(
      schedule
        ? schedule.date
        : `0000${popoverOpenDate?.year ?? ""}`.slice(-4) +
            "-" +
            `00${popoverOpenDate?.month ?? ""}`.slice(-2) +
            "-" +
            `00${popoverOpenDate?.date ?? ""}`.slice(-2)
    );

    // 開始時刻 hh:MM形式
    const [startTime, setStartTime] = useState<string>(
      schedule?.startTime ?? ""
    );

    // 終了時刻 hh:MM形式
    const [endTime, setEndTime] = useState<string>(schedule?.endTime ?? "");

    // メモ
    const [memo, setMemo] = useState<string>(schedule?.memo ?? "");

    // タイトル編集時
    const handleChangeTitle = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
      },
      []
    );

    // 日付編集時
    const handleChangeDate = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
      },
      []
    );

    // 開始時刻編集時
    const handleChangeStartTime = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(event.target.value);
      },
      []
    );

    // 終了時刻編集時
    const handleChangeEndTime = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(event.target.value);
      },
      []
    );

    // メモ編集時
    const handleChangeMemo = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMemo(event.target.value);
      },
      []
    );

    // 閉じるボタン押下時
    const handleClickCloseButton = useCallback(() => {
      // 新規作成時
      if (!schedule) {
        // 入力欄の初期化
        setTitle("");
        setDate(
          `0000${popoverOpenDate?.year ?? ""}`.slice(-4) +
            "-" +
            `00${popoverOpenDate?.month ?? ""}`.slice(-2) +
            "-" +
            `00${popoverOpenDate?.date ?? ""}`.slice(-2)
        );
        setStartTime("");
        setEndTime("");
        setMemo("");
      }

      // ポップオーバーを閉じる
      onClose();
    }, [onClose, popoverOpenDate, schedule]);

    // 保存ボタン押下時
    const handleClickSaveButton = useCallback(() => {
      if (!updateSchedule || !schedule || title === "" || date === "") {
        return;
      }

      // 予定を更新
      updateSchedule({
        id: schedule.id,
        title: title,
        date: date,
        startTime: startTime,
        endTime: endTime,
        memo: memo,
      });
      // ポップオーバーを閉じる
      handleClickCloseButton();
    }, [
      date,
      endTime,
      handleClickCloseButton,
      memo,
      schedule,
      startTime,
      title,
      updateSchedule,
    ]);

    // 削除ボタン押下時
    const handleClickDeleateButton = useCallback(() => {
      if (!deleateSchedule || !schedule) {
        return;
      }

      // 予定を削除
      deleateSchedule(schedule.id);
      // ポップオーバーを閉じる
      handleClickCloseButton();
    }, [deleateSchedule, handleClickCloseButton, schedule]);

    // ポップオーバー領域外クリック時
    const handleClickOutsidePopover = useCallback(() => {
      if (isAddNewSchedule) {
        // 新規作成時
        if (!addSchedule || title === "" || date === "") {
          return;
        }

        // 予定を追加
        addSchedule({
          title: title,
          date: date,
          startTime: startTime,
          endTime: endTime,
          memo: memo,
        });
        // ポップオーバーを閉じる
        handleClickCloseButton();
      } else {
        // 編集時
        // ポップオーバーを閉じる
        handleClickCloseButton();
      }
    }, [
      addSchedule,
      date,
      endTime,
      handleClickCloseButton,
      isAddNewSchedule,
      memo,
      startTime,
      title,
    ]);

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
                  {isAddNewSchedule ? "予定の作成" : "予定の編集"}
                </Text>
                <Spacer />

                {/* 保存ボタン ※編集時のみ表示 */}
                {!isAddNewSchedule ? (
                  <IconButton
                    aria-label="save"
                    icon={
                      <BiSave
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                      />
                    }
                    onClick={handleClickSaveButton}
                    sx={{
                      width: "16px",
                      minWidth: "16px",
                      height: "16px",
                      marginLeft: "5px",
                      backgroundColor: "#fff",
                      color: "#999",
                    }}
                  />
                ) : null}

                {/* 削除ボタン ※編集時のみ表示 */}
                {!isAddNewSchedule ? (
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
                ) : null}

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
              {/* タイトル */}
              <FormControl>
                <Input
                  type="text"
                  value={title}
                  placeholder="タイトルを入力"
                  onChange={handleChangeTitle}
                />
              </FormControl>
              {/* 日時 */}
              <FormControl
                sx={{
                  width: "200px",
                  paddingTop: "8px",
                }}
              >
                <Input
                  type="date"
                  value={date}
                  placeholder="年/月/日"
                  onChange={handleChangeDate}
                />
              </FormControl>
              <HStack
                sx={{
                  paddingTop: "8px",
                }}
              >
                {/* 開始時刻 */}
                <FormControl
                  sx={{
                    width: "120px",
                  }}
                >
                  <Input
                    type="time"
                    value={startTime}
                    onChange={handleChangeStartTime}
                  />
                </FormControl>
                <Text
                  sx={{
                    padding: "0 20px",
                  }}
                >
                  -
                </Text>
                {/* 終了時刻 */}
                <FormControl
                  sx={{
                    width: "120px",
                  }}
                >
                  <Input
                    type="time"
                    value={endTime}
                    onChange={handleChangeEndTime}
                  />
                </FormControl>
              </HStack>
              {/* メモ */}
              <FormControl
                sx={{
                  paddingTop: "8px",
                }}
              >
                <Textarea
                  value={memo}
                  placeholder="memo"
                  onChange={handleChangeMemo}
                />
              </FormControl>
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
