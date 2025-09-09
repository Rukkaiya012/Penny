import { colors, spacingX, spacingY } from "@/constants/theme";
import { TransactionType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { ArrowDown, ArrowUp } from "phosphor-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typos";

type Props = {
  item: TransactionType;
  index: number;
};

const TransactionItem = ({ item }: Props) => {
  const isIncome = item.type === "income";

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.iconBox}>
          {isIncome ? (
            <ArrowDown size={20} color={colors.green} weight="bold" />
          ) : (
            <ArrowUp size={20} color={colors.rose} weight="bold" />
          )}
        </View>
        <View>
          <Typo size={16} fontWeight="600" color={colors.neutral900}>
            {item.category}
          </Typo>
          {item.description && (
            <Typo size={14} color={colors.neutral500}>
              {item.description}
            </Typo>
          )}
        </View>
      </View>

      <Typo
        size={16}
        fontWeight="600"
        color={isIncome ? colors.green : colors.rose}
      >
        ₹ {item.amount}
      </Typo>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._15,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.neutral300,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
  iconBox: {
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: "center",
    alignItems: "center",
  },
});
