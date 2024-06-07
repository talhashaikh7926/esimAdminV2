import React, { useEffect, useRef } from 'react';
import { Layout, Typography } from 'antd';
import { Pie } from '@antv/g2plot';
const { Content } = Layout;
const { Title } = Typography;

const PieChart = () => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      const data = [
        { type: 'Category One', value: 27 },
        { type: 'Category Two', value: 25 },
        { type: 'Category Three', value: 18 },
        { type: 'Category Four', value: 15 },
        { type: 'Category Five', value: 10 },
        { type: 'Others', value: 5 },
      ];

      const piePlot = new Pie(chartContainer.current, {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interactions: [{ type: 'element-active' }, { type: 'element-selected' }],
      });

      piePlot.render();

      
      return () => {
        piePlot.destroy();
      };
    }
  }, []);

  return (
    <Layout style={{ padding: '20px', minHeight: '100vh', backgroundColor: 'white' }}>
      <Content style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', padding: '20px' }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Chart</Title>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div ref={chartContainer} style={{ width: '50%', height: '400px' }}></div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default PieChart;
