/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import {
  AreaSeries,
  Chart,
  CurveType,
  ScaleType,
  Settings,
} from '@elastic/charts';
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiText } from '@elastic/eui';
import React from 'react';
import { merge } from 'lodash';
import { useChartTheme } from '../../../../../../observability/public';
import { NOT_AVAILABLE_LABEL } from '../../../../../common/i18n';
import { px } from '../../../../style/variables';

interface Props {
  color: string;
  series?: Array<{ x: number; y: number | null }> | null;
  width: string;
}

export function SparkPlot(props: Props) {
  const { series, color, width } = props;
  const chartTheme = useChartTheme();

  if (!series || series.every((point) => point.y === null)) {
    return (
      <EuiFlexGroup gutterSize="s" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiIcon type="visLine" color="subdued" />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText size="s" color="subdued">
            {NOT_AVAILABLE_LABEL}
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  return (
    <Chart size={{ height: px(24), width }}>
      <Settings
        theme={merge({}, chartTheme, {
          lineSeriesStyle: {
            point: { opacity: 0 },
          },
          areaSeriesStyle: {
            point: { opacity: 0 },
          },
        })}
        showLegend={false}
        tooltip="none"
      />
      <AreaSeries
        id="area"
        xScaleType={ScaleType.Time}
        yScaleType={ScaleType.Linear}
        xAccessor={'x'}
        yAccessors={['y']}
        data={series}
        color={color}
        curve={CurveType.CURVE_MONOTONE_X}
      />
    </Chart>
  );
}
