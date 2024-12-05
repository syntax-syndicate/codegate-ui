import { ResponsivePie, PieSvgProps } from "@nivo/pie";

type PieChartRawData = {
  id: string;
  label: string;
  value: number;
  color?: string;
  [x: string]: unknown;
};

type PieChartProps = Omit<PieSvgProps<PieChartRawData>, "height" | "width">;

export function PieChart(props: PieChartProps) {
  return <ResponsivePie {...props} />;
}
