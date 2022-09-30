/**
 * カレンダーアプリ
 */
import type React from "react";
import { memo, useCallback, useMemo, useState } from "react";
import {
  Center,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiCalendar, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Calender } from "./Calender";

// 予定
export type Schedule = {
  id: number; // 一意な値
  title: string; // タイトル
  date: string; // 日付 yyyy-mm-dd形式
  startTime: string; // 開始時刻 hh:MM形式
  endTime: string; // 終了時刻 hh:MM形式
  memo: string; // メモ
};

export const App: React.FC = memo(() => {
  // 現在日
  const systemDate = useMemo<{
    year: number;
    month: number;
    date: number;
  }>(() => {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    };
  }, []);

  // カレンダーの表示年月
  const [displayYearMonth, setDisplayYearMonth] = useState<{
    year: number;
    month: number;
  }>({ year: systemDate.year, month: systemDate.month });

  // "<"ボタン押下時
  const handleClickPreviousMonthButton = useCallback<() => void>(() => {
    // 表示月を前の月にする
    setDisplayYearMonth((prevDisplayYearMonth) => {
      return {
        year:
          prevDisplayYearMonth.month - 1 === 0
            ? prevDisplayYearMonth.year - 1
            : prevDisplayYearMonth.year,
        month:
          prevDisplayYearMonth.month - 1 === 0
            ? 12
            : prevDisplayYearMonth.month - 1,
      };
    });
  }, []);

  // ">"ボタン押下時
  const handleClickNextMonthButton = useCallback<() => void>(() => {
    // 表示月を次の月にする
    setDisplayYearMonth((prevDisplayYearMonth) => {
      return {
        year:
          prevDisplayYearMonth.month + 1 === 13
            ? prevDisplayYearMonth.year + 1
            : prevDisplayYearMonth.year,
        month:
          prevDisplayYearMonth.month + 1 === 13
            ? 1
            : prevDisplayYearMonth.month + 1,
      };
    });
  }, []);

  // 登録済み予定リスト
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);

  // 予定の追加
  const handleRequestAddSchedule = useCallback<
    (newSchedule: Omit<Schedule, "id">) => void
  >((newSchedule) => {
    setScheduleList((prevScheduleList) => {
      // idの最大値取得
      const maxId = prevScheduleList
        .map((prevSchedule) => prevSchedule.id)
        .reduce((maxId, id) => Math.max(maxId, id), -Infinity);

      return [
        ...prevScheduleList,
        {
          id: maxId + 1,
          ...newSchedule,
        },
      ];
    });
  }, []);

  // 予定の削除
  const handleRequestDeleateSchedule = useCallback<(targetId: number) => void>(
    (targetId) => {
      setScheduleList((prevScheduleList) => {
        return [
          ...prevScheduleList.filter(
            (prevSchedule) => prevSchedule.id !== targetId
          ),
        ];
      });
    },
    []
  );

  // 予定の更新
  const handleRequestUpdateSchedule = useCallback<
    (newSchedule: Schedule) => void
  >((newSchedule) => {
    setScheduleList((prevScheduleList) => {
      const tempScheduleList = [...prevScheduleList];
      const targetIndex = tempScheduleList.findIndex(
        (tempSchedule) => tempSchedule.id === newSchedule.id
      );

      if (targetIndex !== -1) {
        // 該当予定を上書き
        tempScheduleList[targetIndex] = newSchedule;
      }

      return [...tempScheduleList];
    });
  }, []);

  return (
    <Center
      sx={{
        width: "100vw",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <VStack
        sx={{
          width: "100%",
        }}
      >
        <Flex
          sx={{
            width: "100%",
            height: "36px",
            padding: "0 24px",
          }}
        >
          <Heading
            as="h1"
            sx={{
              fontSize: "24px",
              fontWeight: "normal",
            }}
          >
            <BiCalendar
              color="#57ab65"
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                width: "36px",
                height: "36px",
              }}
            />
            <Text
              sx={{
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "24px",
                fontWeight: "normal",
              }}
            >
              カレンダー
            </Text>
          </Heading>
          <Spacer />
          <Heading
            as="h2"
            sx={{
              fontSize: "24px",
              fontWeight: "normal",
            }}
          >
            <IconButton
              aria-label="<"
              icon={
                <BiChevronLeft
                  style={{
                    width: "36px",
                    height: "36px",
                  }}
                />
              }
              onClick={handleClickPreviousMonthButton}
              sx={{
                backgroundColor: "#fff",
              }}
            />
            <Text
              sx={{
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: "24px",
                fontWeight: "normal",
              }}
            >
              {`${displayYearMonth.year}年${displayYearMonth.month}月`}
            </Text>
            <IconButton
              aria-label=">"
              icon={
                <BiChevronRight
                  style={{
                    width: "36px",
                    height: "36px",
                  }}
                />
              }
              onClick={handleClickNextMonthButton}
              sx={{
                backgroundColor: "#fff",
              }}
            />
          </Heading>
        </Flex>
        <Calender
          systemDate={systemDate}
          displayYearMonth={displayYearMonth}
          scheduleList={scheduleList.filter((schedule) => {
            // 年は4桁、月は2桁にするために頭を0埋め
            const year = `0000${displayYearMonth.year}`.slice(-4);
            const month = `00${displayYearMonth.month}`.slice(-2);
            return schedule.date.startsWith(`${year}-${month}`);
          })}
          onRequestAddSchedule={handleRequestAddSchedule}
          onRequestDeleateSchedule={handleRequestDeleateSchedule}
          onRequestUpdateSchedule={handleRequestUpdateSchedule}
        />
      </VStack>
    </Center>
  );
});