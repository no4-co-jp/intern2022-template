/**
 * カレンダー - 月
 */
import React, { useMemo } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { DateCell } from "./DateCell";
import type { Schedule } from "~/components/App";

type Props = {
  systemDate: {
    year: number;
    month: number;
    date: number;
  };
  displayYearMonth: {
    year: number;
    month: number;
  };
  scheduleList: Schedule[];
  // 予定の追加処理
  addSchedule: (newSchedule: Omit<Schedule, "id">) => void;
  // 予定の削除処理
  deleateSchedule: (targetId: number) => void;
  // 予定の更新処理
  updateSchedule: (newSchedule: Schedule) => void;
};

export const Calender: React.FC<Props> = React.memo(
  ({
    systemDate,
    displayYearMonth,
    scheduleList,
    addSchedule,
    deleateSchedule,
    updateSchedule,
  }) => {
    // 1日の曜日インデックス(日：0, 月:1, ..., 土:6)
    const firstDayIndex = useMemo(() => {
      const date = new Date(
        displayYearMonth.year,
        displayYearMonth.month - 1,
        1
      );
      return date.getDay();
    }, [displayYearMonth]);

    // 月末最終日の日付
    const lastDateNumber = useMemo(() => {
      const date = new Date(displayYearMonth.year, displayYearMonth.month, 0); // 翌月の0日を指定
      return date.getDate();
    }, [displayYearMonth]);

    const weekList: (null | number)[][] = useMemo(() => {
      const list = [
        // 日曜日から1日までをnull埋め
        ...Array(firstDayIndex)
          .fill(null)
          .map(() => null),

        // 1日～月末最終日
        ...Array(lastDateNumber)
          .fill(1)
          .map((_, index) => index + 1),

        // 月末最終日から土曜日までをnull埋め
        ...Array(
          (firstDayIndex + lastDateNumber) % 7 === 0
            ? 0
            : 7 - ((firstDayIndex + lastDateNumber) % 7)
        )
          .fill(null)
          .map(() => null),
      ];

      // 7個ごとの配列にする
      return Array(Math.ceil(list.length / 7))
        .fill(1)
        .map((_, index) => list.slice(index * 7, (index + 1) * 7));
    }, [firstDayIndex, lastDateNumber]);

    return (
      <Table>
        <Thead>
          <Tr>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              日曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              月曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              火曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              水曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              木曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              金曜日
            </Th>
            <Th
              sx={{
                padding: "5px",
                borderColor: "#aab5c1",
                borderX: "1px solid",
                borderY: "2px solid",
                fontSize: "16px",
                fontWeight: "normal",
                color: "#999",
              }}
            >
              土曜日
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {weekList.map((week, weekIndex) => {
            return (
              <Tr key={weekIndex}>
                {week.map((date, dateIndex) => {
                  return (
                    <Td
                      key={`${weekIndex}-${dateIndex}`}
                      sx={{
                        width: "100px",
                        height: "120px",
                        padding: "0px",
                        border: "1px solid #aab5c1",
                        fontSize: "16px",
                        color: "#999",
                      }}
                    >
                      {date ? (
                        <DateCell
                          date={{
                            year: displayYearMonth.year,
                            month: displayYearMonth.month,
                            date: date,
                          }}
                          isToday={
                            systemDate.year === displayYearMonth.year &&
                            systemDate.month === displayYearMonth.month &&
                            systemDate.date === date
                          }
                          scheduleList={scheduleList.filter((schedule) => {
                            return schedule.date.endsWith(
                              `00${date}`.slice(-2) // 日は2桁にするために頭を0埋め
                            );
                          })}
                          addSchedule={addSchedule}
                          deleateSchedule={deleateSchedule}
                          updateSchedule={updateSchedule}
                        />
                      ) : null}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  }
);
