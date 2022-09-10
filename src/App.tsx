import React, { useCallback, useMemo, useState } from "react";
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

export const App: React.FC = React.memo(() => {
  // 現在日
  const systemDate = useMemo(() => {
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
  const handleClickPreviousMonthButton = useCallback(() => {
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
  const handleClickNextMonthButton = useCallback(() => {
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
        <Calender systemDate={systemDate} displayYearMonth={displayYearMonth} />
      </VStack>
    </Center>
  );
});
