import * as React from "react";
import {Category, Component, Palette, Variant} from "@haulmont/react-ide-toolbox";
import {EntityPivotTable} from "./dist";
import {BarChart} from "./dist";
import {CalendarChart} from "./dist";
import {ChordChart} from "./dist";
import {ChoroplethChart} from "./dist";
import {CirclePackingChart} from "./dist";
import {ClusteredBarChart} from "./dist";
import {DonutChart} from "./dist";
import {FunnelChart} from "./dist";
import {HeatMapChart} from "./dist";
import {HorizontalCalendarChart} from "./dist";
import {HorizontalWaffleChart} from "./dist";
import {LineChart} from "./dist";
import {NetworkChart} from "./dist";
import {PieChart} from "./dist";
import {RadarChart} from "./dist";
import {RadialBarChart} from "./dist";
import {ScatterChart} from "./dist";
import {SmoothedLineChart} from "./dist";
import {StackedLineChart} from "./dist";
import {TreeMapChart} from "./dist";
import {WaffleChart} from "./dist";

export const ChartsPalette = () => (
    <Palette>
        <Category name="PivotTable">
            <Component name="EntityPivotTable">
                <Variant>
                    <EntityPivotTable entities={[]} fields={[]}/>
                </Variant>
            </Component>
        </Category>
        <Category name="Charts">
            <Component name="BarChart">
                <Variant>
                    <BarChart data={[]} indexBy={''} keys={[]}/>
                </Variant>
            </Component>
            <Component name="CalendarChart">
                <Variant>
                    <CalendarChart data={[]} valueKey={''} dayKey={''} from={new Date()} to={new Date()} />
                </Variant>
            </Component>
            <Component name="ChordChart">
                <Variant>
                    <ChordChart keys={[]} layers={[]} matrix={[]}/>
                </Variant>
            </Component>
            <Component name="ChoroplethChart">
                <Variant>
                    <ChoroplethChart data={[]} domain={[]} features={[]}/>
                </Variant>
            </Component>
            <Component name="CirclePackingChart">
                <Variant>
                    <CirclePackingChart data={[]} />
                </Variant>
            </Component>
            <Component name="ClusteredBarChart">
                <Variant>
                    <ClusteredBarChart data={[]} indexBy={''} keys={[]}/>
                </Variant>
            </Component>
            <Component name="DonutChart">
                <Variant>
                    <DonutChart data={[]} idKey={''} labelKey={''} valueKey={''}/>
                </Variant>
            </Component>
            <Component name="FunnelChart">
                <Variant>
                    <FunnelChart data={[]} idKey={''} valueKey={''} labelKey={''} />
                </Variant>
            </Component>
            <Component name="HeatMapChart">
                <Variant>
                    <HeatMapChart data={[]} />
                </Variant>
            </Component>
            <Component name="HorizontalCalendarChart">
                <Variant>
                    <HorizontalCalendarChart data={[]} valueKey={''} dayKey={''} from={new Date()} to={new Date()} />
                </Variant>
            </Component>
            <Component name="HorizontalWaffleChart">
                <Variant>
                    <HorizontalWaffleChart data={[]} idKey={''} valueKey={''} labelKey={''} columns={0} rows={0} total={0}/>
                </Variant>
            </Component>
            <Component name="LineChart">
                <Variant>
                    <LineChart id={''} data={[]} xKey={''} yKey={''}/>
                </Variant>
            </Component>
            <Component name="NetworkChart">
                <Variant>
                    <NetworkChart nodes={[]} links={[]} nodeColor={''}/>
                </Variant>
            </Component>
            <Component name="PieChart">
                <Variant>
                    <PieChart data={[]} idKey={''} labelKey={''} valueKey={''}/>
                </Variant>
            </Component>
            <Component name="RadarChart">
                <Variant>
                    <RadarChart data={[]} indexBy={''} keys={[]}/>
                </Variant>
            </Component>
            <Component name="RadialBarChart">
                <Variant>
                    <RadialBarChart id={''} data={[]} xKey={''} yKey={''}/>
                </Variant>
            </Component>
            <Component name="ScatterChart">
                <Variant>
                    <ScatterChart id={''} data={[]} xKey={''} yKey={''}/>
                </Variant>
            </Component>
            <Component name="SmoothedLineChart">
                <Variant>
                    <SmoothedLineChart id={''} data={[]} xKey={''} yKey={''}/>
                </Variant>
            </Component>
            <Component name="StackedLineChart">
                <Variant>
                    <StackedLineChart id={''} data={[]} xKey={''} yKey={''}/>
                </Variant>
            </Component>
            <Component name="TreeMapChart">
                <Variant>
                    <TreeMapChart data={[]} />
                </Variant>
            </Component>
            <Component name="WaffleChart">
                <Variant>
                    <WaffleChart data={[]} idKey={''} valueKey={''} labelKey={''} columns={0} rows={0} total={0}/>
                </Variant>
            </Component>
        </Category>
    </Palette>
);
