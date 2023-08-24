import { useMemo, ReactNode } from 'react'

// @mui material components
import Card from '@mui/material/Card'
import Icon from '@mui/material/Icon'

// ThreeD Garden components
import MDBox from '#/lib/mui/MDBox'
import MDTypography from '#/lib/mui/MDTypography'

// BubbleChart configurations
import configs from '~/ui/elements/Charts/BubbleChart/config'

// ThreeD Garden Base Styles
import colors from '#/ui/themes/theme-light/base/colors'

// react-chartjs-2 components
import { Bubble } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

// Declaring props types for BubbleChart
interface Props {
  icon?: {
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark'
    component: ReactNode
  }
  title?: string
  description?: string | ReactNode
  height?: string | number
  chart: {
    labels: string[]
    datasets: {
      label: string
      color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark'
      data: {
        x: number
        y: number
        r: number
      }[]
    }[]
  }
  [key: string]: any
}

function BubbleChart({ icon, title, description, height, chart }: Props): JSX.Element {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 2,
        backgroundColor: colors[dataset.color] ? colors[dataset.color || 'dark'].main : colors.dark.main,
        borderColor: colors[dataset.color] ? colors[dataset.color || 'dark'].main : colors.dark.main,
        maxBarThickness: 6,
      }))
    : []

  const { data, options } = configs(chart.labels || [], chartDatasets)

  const renderChart = (
    <MDBox
      py={2}
      pr={2}
      pl={icon.component ? 1 : 2}
    >
      {title || description ? (
        <MDBox
          display='flex'
          px={description ? 1 : 0}
          pt={description ? 1 : 0}
        >
          {icon.component && (
            <MDBox
              width='4rem'
              height='4rem'
              bgColor={icon.color || 'info'}
              variant='gradient'
              coloredShadow={icon.color || 'info'}
              borderRadius='xl'
              display='flex'
              justifyContent='center'
              alignItems='center'
              color='white'
              mt={-5}
              mr={2}
            >
              <Icon fontSize='medium'>{icon.component}</Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && <MDTypography variant='h6'>{title}</MDTypography>}
            <MDBox mb={2}>
              <MDTypography
                component='div'
                variant='button'
                color='text'
              >
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox height={height}>
            <Bubble data={data} />
            {/* options={options} */}
          </MDBox>
        ),
        [chart, height]
      )}
    </MDBox>
  )

  return title || description ? <Card>{renderChart}</Card> : renderChart
}

// Declaring default props for BubbleChart
BubbleChart.defaultProps = {
  icon: { color: 'info', component: '' },
  title: '',
  description: '',
  height: '100%',
}

export default BubbleChart
