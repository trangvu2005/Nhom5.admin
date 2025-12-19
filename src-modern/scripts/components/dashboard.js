// ==========================================================================
// Dashboard Manager - Advanced data visualization and components
// ==========================================================================

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import ApexCharts from 'apexcharts';

// Register Chart.js components and controllers
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export class DashboardManager {
  constructor() {
    this.charts = new Map();
    this.data = {
      revenue: [],
      users: [],
      orders: [],
      performance: [],
      recentOrders: [],
      salesByLocation: []
    };
    this.init();
  }

  async init() {
    console.log('🚀 Advanced Dashboard Manager initialized');
    
    // Load sample data
    await this.loadDashboardData();
    
    // Initialize charts
    this.initRevenueChart();
    this.initUserGrowthChart();
    this.initOrderStatusChart();
    this.initStorageChart();
    this.initSalesByLocationChart();
    this.populateRecentOrders();
    
    // Initialize real-time updates
    this.startRealTimeUpdates();
    
    // Initialize interactive elements
    this.initInteractiveElements();
  }

  async loadDashboardData() {
    // Simulate API call with realistic data
    this.data.revenue = this.generateRevenueData();
    this.data.users = this.generateUserData();
    this.data.orders = this.generateOrderData();
    this.data.performance = this.generatePerformanceData();
    this.data.recentOrders = this.generateRecentOrders();
    this.data.salesByLocation = this.generateSalesByLocation();
  }

  generateRevenueData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      profit: Math.floor(Math.random() * 20000) + 5000
    }));
  }

  generateUserData() {
    const days = Array.from({length: 30}, (_, i) => i + 1);
    return days.map(day => ({
      day,
      newUsers: Math.floor(Math.random() * 100) + 20,
      activeUsers: Math.floor(Math.random() * 500) + 200
    }));
  }

  generateOrderData() {
    return {
      XacNhan: 1245,
      ThanhToan: 87,
      HoanThanh: 179
    };
  }

  generateRecentOrders() {
    const customers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Bob Brown'];
    const statuses = [
        { text: 'Xác nhận', class: 'bg-success' },
        { text: 'Thanh toán', class: 'bg-warning' },
    ];
    return Array.from({length: 5}, () => ({
        id: `#${Math.floor(Math.random() * 9000) + 1000}`,
        customer: customers[Math.floor(Math.random() * customers.length)],
        amount: `$${(Math.random() * 500 + 50).toFixed(2)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7).toLocaleDateString()
    }));
  }

  generateSalesByLocation() {
    return [
        { "name": "Quan 10", "value": 2822},
        { "name": "Quan 3 ", "value": 1432},
        { "name": "Quan 1", "value": 980},
        { "name": "Quan Binh Thanh", "value": 780},
        { "name": "Quan 8", "value": 650},
        { "name": "Quan Thu Đuc", "value": 450},
    ]
  }

  generatePerformanceData() {
    const hours = Array.from({length: 24}, (_, i) => i);
    return hours.map(hour => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      responseTime: Math.random() * 2 + 0.5,
      requests: Math.floor(Math.random() * 1000) + 100
    }));
  }

  initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.revenue.map(item => item.month),
        datasets: [
          {
            label: 'Revenue',
            data: this.data.revenue.map(item => item.revenue),
            borderColor: 'rgb(21, 91, 101)',
            backgroundColor: 'rgba(21, 91, 101, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgb(21, 91, 101)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: 'Profit',
            data: this.data.revenue.map(item => item.profit),
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgb(16, 185, 129)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            border: {
              display: false
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    });

    this.charts.set('revenue', chart);
  }

  initUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.users.slice(-7).map(item => `Day ${item.day}`),
        datasets: [
          {
            label: 'New Users',
            data: this.data.users.slice(-7).map(item => item.newUsers),
            backgroundColor: 'rgba(21, 91, 101, 0.8)',
            borderColor: 'rgb(21, 91, 101, 0.8)',
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    });

    this.charts.set('userGrowth', chart);
  }
  initStorageChart() {
    const options = {
      chart: {
        height: 280,
        type: "radialBar",
      },
      series: [76],
      colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "#293450"
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Used Space"]
    };

    const chart = new ApexCharts(document.querySelector("#storageStatusChart"), options);
    chart.render();
    this.charts.set('storage', chart);
  }
  populateRecentOrders() {
      const tableBody = document.getElementById('recent-orders-table');
      if (!tableBody) return;

      tableBody.innerHTML = this.data.recentOrders.map(order => `
          <tr>
              <td><strong>${order.id}</strong></td>
              <td>${order.customer}</td>
              <td>${order.amount}</td>
              <td><span class="badge ${order.status.class}">${order.status.text}</span></td>
              <td>${order.date}</td>
          </tr>
      `).join('');
  }

  startRealTimeUpdates() {
    // Update charts every 30 seconds with new data
    setInterval(() => {
      this.updateChartsWithRealTimeData();
    }, 30000);
  }

  updateChartsWithRealTimeData() {
    // Update revenue chart
    const revenueChart = this.charts.get('revenue');
    if (revenueChart) {
      const newRevenue = Math.floor(Math.random() * 50000) + 10000;
      const newProfit = Math.floor(Math.random() * 20000) + 5000;
      
      revenueChart.data.datasets[0].data.push(newRevenue);
      revenueChart.data.datasets[1].data.push(newProfit);
      
      if (revenueChart.data.datasets[0].data.length > 12) {
        revenueChart.data.datasets[0].data.shift();
        revenueChart.data.datasets[1].data.shift();
        revenueChart.data.labels.shift();
      }
      
      revenueChart.update('none');
    }

    // Update stats cards
    this.updateStatsCards();
  }

  updateStatsCards() {
    const statsElements = document.querySelectorAll('[data-stat-value]');
    statsElements.forEach(element => {
      // Tìm phần tử chứa badge (thẻ small) để đổi màu
      const parent = element.closest('.flex-grow-1');
      const badge = parent.querySelector('small');
      
      const currentValue = parseInt(element.textContent.replace(/[^0-9]/g, ''));
      const change = Math.floor(Math.random() * 20) - 10; // Giả lập mức tăng/giảm ngẫu nhiên
      const newValue = currentValue + change;
      
      if (newValue > 0) {
        this.animateNumber(element, currentValue, newValue);
        
        // Kiểm tra logic để đổi màu sắc trực quan
        if (change >= 0) {
            // Nếu tăng: Đổi thành chữ xanh và hiện icon mũi tên lên
            badge.className = 'text-success';
            badge.innerHTML = `<i class="bi bi-arrow-up"></i> +${Math.abs(change)}%`;
        } else {
            // Nếu giảm: Đổi thành chữ đỏ và hiện icon mũi tên xuống
            badge.className = 'text-danger';
            badge.innerHTML = `<i class="bi bi-arrow-down"></i> -${Math.abs(change)}%`;
        }
      }
    });
  }

  animateNumber(element, start, end) {
    const duration = 1000;
    const steps = 30;
    const stepValue = (end - start) / steps;
    let current = start;
    let step = 0;

    const timer = setInterval(() => {
      current += stepValue;
      step++;
      
      const formatted = Math.floor(current).toLocaleString();
      element.textContent = element.textContent.replace(/[\d,]+/, formatted);
      
      if (step >= steps) {
        clearInterval(timer);
        const finalFormatted = end.toLocaleString();
        element.textContent = element.textContent.replace(/[\d,]+/, finalFormatted);
      }
    }, duration / steps);
  }

  initInteractiveElements() {
    // Chart period switcher
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-chart-period]')) {
        const period = e.target.dataset.chartPeriod;
        this.updateChartPeriod(period);
        
        // Update active state
        document.querySelectorAll('[data-chart-period]').forEach(btn => {
          btn.classList.remove('active');
        });
        e.target.classList.add('active');
      }
    });

    // Export functionality
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-export-chart]')) {
        const chartName = e.target.dataset.exportChart;
        this.exportChart(chartName);
      }
    });
  }

  updateChartPeriod(period) {
    // Regenerate data based on period
    switch (period) {
      case '7d':
        this.loadWeeklyData();
        break;
      case '30d':
        this.loadMonthlyData();
        break;
      case '90d':
        this.loadQuarterlyData();
        break;
      case '1y':
        this.loadYearlyData();
        break;
    }
  }

  loadWeeklyData() {
    // Update charts with weekly data
    console.log('Loading weekly data...');
  }

  loadMonthlyData() {
    // Update charts with monthly data
    console.log('Loading monthly data...');
  }

  loadQuarterlyData() {
    // Update charts with quarterly data
    console.log('Loading quarterly data...');
  }

  loadYearlyData() {
    // Update charts with yearly data
    console.log('Loading yearly data...');
  }

  exportChart(chartName) {
    const chart = this.charts.get(chartName);
    if (chart) {
      const url = chart.toBase64Image();
      const link = document.createElement('a');
      link.download = `${chartName}-chart.png`;
      link.href = url;
      link.click();
    }
  }

  destroy() {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
    
  }
} 
document.addEventListener('DOMContentLoaded', function() {
    // Tìm tất cả các thẻ select trong khu vực biểu đồ
    const filters = document.querySelectorAll('.card-header select');

    filters.forEach((filter, index) => {
        const storageKey = `revenue_filter_${index}`;
        
        // 1. Tải lại lựa chọn đã lưu từ bộ nhớ trình duyệt
        const savedChoice = localStorage.getItem(storageKey);
        if (savedChoice) {
            filter.value = savedChoice;
        }

        // 2. Lắng nghe sự kiện khi người dùng thay đổi lựa chọn
        filter.addEventListener('change', function() {
            localStorage.setItem(storageKey, this.value);
            
            // Thông báo giả lập cập nhật dữ liệu (Sau này bạn có thể kết nối với biểu đồ thật tại đây)
            console.log(`Đang lọc dữ liệu theo: ${this.options[this.selectedIndex].text}`);
            
            // Bạn có thể thêm hiệu ứng tải lại nhẹ để admin biết dữ liệu đang được lọc
            const chartArea = document.getElementById('revenueChart');
            chartArea.style.opacity = '0.5';
            setTimeout(() => { chartArea.style.opacity = '1'; }, 300);
        });
    });
});