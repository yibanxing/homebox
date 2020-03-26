import { ProgressBar, IProgressBarProps, Tag } from "@blueprintjs/core";
import { css } from "@emotion/core";
import { memo, useContext } from "react";
import { RateFormatterContext } from "../context";

const K = 1024
const SPEED_SPANS = [0, 128, 512, 2048, 8000, 20000, 80000, 125000, 1024 * 1024].map(v => v * K)

export const SpeedIndicator = memo(function SpeedIndicator({speed}: {
  speed?: number
}) {
  const formatter = useContext(RateFormatterContext)
  const pbp: IProgressBarProps = {}
  if (typeof speed === 'number') {
    const i = SPEED_SPANS.findIndex(v => v >= speed)
    if (i === -1) {
      pbp.value = 1
    } else if (i === 0) {
      pbp.value = 0
    } else {
      pbp.value = (i / SPEED_SPANS.length) - (SPEED_SPANS[i] - speed) / (SPEED_SPANS[i] - SPEED_SPANS[i - 1])
    }
    if (pbp.value < .1) {
      pbp.intent = 'danger'
    } else if (pbp.value < .3) {
      pbp.intent = 'warning'
    } else if (pbp.value < .5) {
      pbp.intent = 'primary'
    } else {
      pbp.intent = 'success'
    }
  }
  return (
    <div css={css`
      display: flex;
      align-items: center;
    `}>
      <ProgressBar css={css``} {...pbp}/>
      <Tag round={true} css={css`flex: none; margin-left: 8px;`} intent={pbp.intent}>{speed !== undefined ? formatter(speed) : 'Waiting...'}</Tag>
    </div>
  )
})
