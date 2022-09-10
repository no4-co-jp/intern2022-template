import React from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  date: number; // 日付
  isToday: boolean; // 現在日か
};

export const DateCell: React.FC<Props> = React.memo(({ date, isToday }) => {
  return (
    <Box
      sx={{
        height: "100%",
        padding: isToday ? "2px 5px 5px" : "5px",
        borderTop: isToday ? "3px solid #57ab65" : "",
        fontSize: "16px",
        color: isToday ? "#57ab65" : "#999",
      }}
    >
      {date}日
    </Box>
  );
});
