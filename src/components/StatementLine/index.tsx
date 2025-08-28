import Icon from "components/Icon";
import { memo } from "react";
import { Link } from "react-router";
import formatCurrency from "utils/format-currency";
import { statementLineStyle } from "./styles";
import type { StatementLineProps } from "./types";

function StatementLine({
  to,
  icon,
  title,
  category,
  updatedAt,
  amount,
}: StatementLineProps) {
  const isIncome = amount > 0;
  const typeVariant = isIncome ? "income" : "expense";
  const typeIcon = isIncome ? "ArrowLeftDown" : "ArrowRightUp";
  const {
    container,
    iconContainer,
    typeContainer,
    contentContainer,
    subtitleContainer,
    amountContainer,
  } = statementLineStyle({ type: typeVariant });

  return (
    <Link to={to} className={container()}>
      <span className={iconContainer()}>
        <Icon name={icon} />
        <span className={typeContainer()}>
          <Icon name={typeIcon} size={12} className="text-white" />
        </span>
      </span>
      <div className={contentContainer()}>
        <p>{title}</p>
        <p className={subtitleContainer()}>
          {updatedAt} • {category}
        </p>
      </div>
      <div>
        <p className={amountContainer()}>{formatCurrency(amount)}</p>
      </div>
    </Link>
  );
}

export default memo(StatementLine);
