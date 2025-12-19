import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('orderTable', () => ({
    orders: [],
    filteredOrders: [],
    selectedOrders: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    statusFilter: '',
    dateFilter: '',
    sortField: 'orderNumber',
    sortDirection: 'desc',
    isLoading: false,
    chartsInitialized: false,

    // Statistics
    stats: {
      total: 0,
      pending: 0,
      shipped: 0,
      revenue: 0
    },

    statusStats: [],

    init() {
      this.loadSampleData();
      this.filterOrders();
      this.calculateStats();
      
      // Delay chart initialization to ensure DOM is fully ready
      setTimeout(() => {
        this.initCharts();
      }, 500);
    },

    loadSampleData() {
      this.orders = [
       {
        id: 1,
        orderNumber: 'VE-UEH-001',
        customer: {
            name: 'Nguyễn Văn An',
            email: 'an.nguyen@st.ueh.edu.vn'
        },
        items: [{ name: 'AI Trong Doanh Nghiệp - Workshop', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'delivered', // Đã hoàn thành
        orderDate: '2025-10-15',
        shippingAddress: 'B1.204, UEH Cơ sở B'
    },
    {
        id: 2,
        orderNumber: 'VE-UEH-002',
        customer: {
            name: 'Lê Thị Bình',
            email: 'binh.le@st.ueh.edu.vn'
        },
        items: [{ name: 'Storytelling Thời AI - Webinar', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'pending', // Đang chờ duyệt
        orderDate: '2025-09-05',
        shippingAddress: 'Trực tuyến qua Zoom'
    },
    {
        id: 3,
        orderNumber: 'VE-UEH-003',
        customer: {
            name: 'Trần Minh Chiến',
            email: 'chien.tran@st.ueh.edu.vn'
        },
        items: [{ name: 'Cuộc thi HORIZON 2025', quantity: 1, price: 10000 }],
        itemCount: 1,
        total: 10000,
        status: 'processing', // Đang xử lý
        orderDate: '2025-09-23',
        shippingAddress: 'Online/Cơ sở UEH'
    },
    {
        id: 4,
        orderNumber: 'VE-UEH-004',
        customer: {
            name: 'Phạm Thu Dung',
            email: 'dung.pham@st.ueh.edu.vn'
        },
        items: [{ name: 'Cuộc thi DNA - EPIC CONTEST', quantity: 2, price: 10000 }],
        itemCount: 2,
        total: 20000,
        status: 'shipped', // Đã phát hành vé
        orderDate: '2025-09-20',
        shippingAddress: 'UEH Quiz/Cơ sở B'
    },
    {
        id: 5,
        orderNumber: 'VE-UEH-005',
        customer: {
            name: 'Hoàng Minh Đức',
            email: 'duc.hoang@st.ueh.edu.vn'
        },
        items: [{ name: 'Lễ Hội Nối Vòng Tay Lớn 2025', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'cancelled', // Đã hủy vé
        orderDate: '2025-10-08',
        shippingAddress: 'Hội trường A.116'
    },
    {
        id: 6,
        orderNumber: 'VE-UEH-006',
        customer: {
            name: 'Đặng Thúy Hạnh',
            email: 'hanh.dang@st.ueh.edu.vn'
        },
        items: [{ name: 'Workshop Quản Lý Dự Án Chuyển Đổi Số', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'processing',
        orderDate: '2024-11-20',
        shippingAddress: 'UEH Cơ sở B'
    },
    {
        id: 7,
        orderNumber: 'VE-UEH-007',
        customer: {
            name: 'Bùi Anh Khoa',
            email: 'khoa.bui@st.ueh.edu.vn'
        },
        items: [{ name: 'UEH CINEBOX - Sài Gòn, Anh Yêu Em', quantity: 2, price: 15000 }],
        itemCount: 2,
        total: 30000,
        status: 'pending',
        orderDate: '2025-10-05',
        shippingAddress: 'Hội trường B1.302'
    },
    {
        id: 8,
        orderNumber: 'VE-UEH-008',
        customer: {
            name: 'Vũ Diệu Linh',
            email: 'linh.vu@st.ueh.edu.vn'
        },
        items: [{ name: 'Talkshow Green Business Showcase', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'shipped',
        orderDate: '2025-08-25',
        shippingAddress: 'B1.302'
    },
    {
        id: 9,
        orderNumber: 'VE-UEH-009',
        customer: {
            name: 'Ngô Quốc Nam',
            email: 'nam.ngo@st.ueh.edu.vn'
        },
        items: [{ name: 'Du Lịch Và Cuộc Sống - LUMINARIS', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'delivered',
        orderDate: '2025-11-28',
        shippingAddress: 'Hội trường A.116'
    },
    {
        id: 10,
        orderNumber: 'VE-UEH-010',
        customer: {
            name: 'Lý Kim Oanh',
            email: 'oanh.ly@st.ueh.edu.vn'
        },
        items: [{ name: 'Talkshow An Toàn Tình Dục - CUDDLE', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'processing',
        orderDate: '2025-12-14',
        shippingAddress: 'B1.205'
    },
    {
        id: 11,
        orderNumber: 'VE-UEH-011',
        customer: {
            name: 'Đỗ Tiến Phát',
            email: 'phat.do@st.ueh.edu.vn'
        },
        items: [{ name: 'Talkshow Cyber Security - PIN', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'pending',
        orderDate: '2025-11-12',
        shippingAddress: 'Trực tuyến'
    },
    {
        id: 12,
        orderNumber: 'VE-UEH-012',
        customer: {
            name: 'Trương Mỹ Quyên',
            email: 'quyen.truong@st.ueh.edu.vn'
        },
        items: [{ name: 'Workshop Nâng Hạng TTCK Việt Nam', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'shipped',
        orderDate: '2025-09-25',
        shippingAddress: 'B1.302'
    },
    {
        id: 13,
        orderNumber: 'VE-UEH-013',
        customer: {
            name: 'Mai Thế Sơn',
            email: 'son.mai@st.ueh.edu.vn'
        },
        items: [{ name: 'Zeeniverse By U - Cuộc Thi Mascot', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'delivered',
        orderDate: '2025-11-10',
        shippingAddress: 'Online UEH'
    },
    {
        id: 14,
        orderNumber: 'VE-UEH-014',
        customer: {
            name: 'Tô Ngọc Tú',
            email: 'tu.to@st.ueh.edu.vn'
        },
        items: [{ name: 'Workshop Khám Phá AI Và Web3', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'processing',
        orderDate: '2024-10-15',
        shippingAddress: 'B1.303'
    },
    {
        id: 15,
        orderNumber: 'VE-UEH-015',
        customer: {
            name: 'Phan Uyên Vi',
            email: 'vi.phan@st.ueh.edu.vn'
        },
        items: [{ name: 'Webinar Bản Đồ Ikigai', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'pending',
        orderDate: '2024-12-05',
        shippingAddress: 'Trực tuyến'
    },
    {
        id: 16,
        orderNumber: 'VE-UEH-016',
        customer: {
            name: 'Lê Hoàng Xuân',
            email: 'xuan.le@st.ueh.edu.vn'
        },
        items: [{ name: 'Lễ Tuyên Dương SV5T 2025', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'delivered',
        orderDate: '2025-12-14',
        shippingAddress: 'B1.302'
    },
    {
        id: 17,
        orderNumber: 'VE-UEH-017',
        customer: {
            name: 'Trịnh Quốc Uy',
            email: 'uy.trinh@st.ueh.edu.vn'
        },
        items: [{ name: 'Motivation Day - Intel-Legacy', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'shipped',
        orderDate: '2025-09-03',
        shippingAddress: 'Hội trường B1.302'
    },
    {
        id: 18,
        orderNumber: 'VE-UEH-018',
        customer: {
            name: 'Nguyễn Bảo Yến',
            email: 'yen.nguyen@st.ueh.edu.vn'
        },
        items: [{ name: 'Workshop Job Whisperer', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'processing',
        orderDate: '2025-11-20',
        shippingAddress: 'Online'
    },
    {
        id: 19,
        orderNumber: 'VE-UEH-019',
        customer: {
            name: 'Lâm Nhật Minh',
            email: 'minh.lam@st.ueh.edu.vn'
        },
        items: [{ name: 'Growth Hacking Đột Phá 2025', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'cancelled',
        orderDate: '2024-12-12',
        shippingAddress: 'Online'
    },
    {
        id: 20,
        orderNumber: 'VE-UEH-020',
        customer: {
            name: 'Đoàn Gia Bảo',
            email: 'bao.doan@st.ueh.edu.vn'
        },
        items: [{ name: 'Lễ Tuyên Dương Frontline 2025', quantity: 1, price: 0 }],
        itemCount: 1,
        total: 0,
        status: 'delivered',
        orderDate: '2025-12-05',
        shippingAddress: 'Bình chọn trực tuyến'
    }
      ];
    },

calculateStats() {
  this.stats.total = this.orders.length;
  
  // Ánh xạ từ mã code sang tên tiếng Việt chuẩn
  const statusMap = {
    'pending': 'Đang chờ',
    'processing': 'Đang xử lý',
    'shipped': 'Đã phát hành',
    'delivered': 'Đã hoàn thành',
    'cancelled': 'Đã hủy'
  };

  // Cập nhật thống kê thẻ (Stats cards) - dùng cả code cũ và tên mới để tránh sót dữ liệu
  this.stats.pending = this.orders.filter(o => o.status === 'pending' || o.status === 'Đang chờ').length;
  this.stats.delivered = this.orders.filter(o => o.status === 'delivered' || o.status === 'Đã hoàn thành').length;
  this.stats.revenue = 60000; // Giữ nguyên theo dashboard của bạn

  const statuses = {};
  this.orders.forEach(order => {
    // Chuyển đổi tên trạng thái sang tiếng Việt trước khi đưa vào mảng thống kê biểu đồ
    const vnName = statusMap[order.status] || order.status;
    statuses[vnName] = (statuses[vnName] || 0) + 1;
  });

  this.statusStats = Object.entries(statuses).map(([name, count]) => ({
    name: name, // Bây giờ name đã là "Đã hoàn thành", "Đang chờ"...
    count,
    percentage: Math.round((count / this.orders.length) * 100),
    color: this.getStatusColor(name)
  }));
},

getStatusColor(status) {
  const colors = {
    // Chấp nhận cả phím tiếng Anh và tiếng Việt để không bị lỗi màu xám
    'pending': '#ffc107',
    'Đang chờ': '#ffc107',
    'processing': '#0d6efd',
    'Đang xử lý': '#0d6efd',
    'shipped': '#17a2b8',
    'Đã phát hành': '#17a2b8',
    'delivered': '#28a745',
    'Đã hoàn thành': '#28a745',
    'cancelled': '#dc3545',
    'Đã hủy': '#dc3545'
  };
  // Chuyển về chữ thường để so sánh chính xác hơn
  return colors[status] || colors[status?.toLowerCase()] || '#6c757d';
},
    filterOrders() {
      this.filteredOrders = this.orders.filter(order => {
        const matchesSearch = !this.searchQuery || 
          order.orderNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchesStatus = !this.statusFilter || order.status === this.statusFilter;
        
        const matchesDate = !this.dateFilter || this.matchesDateFilter(order.orderDate);

        return matchesSearch && matchesStatus && matchesDate;
      });

      this.sortOrders();
      this.currentPage = 1;
    },

    matchesDateFilter(orderDate) {
      const today = new Date();
      const orderDateObj = new Date(orderDate);
      
      switch (this.dateFilter) {
        case 'today':
          return orderDateObj.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDateObj >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDateObj >= monthAgo;
        default:
          return true;
      }
    },

    sortOrders() {
      this.filteredOrders.sort((a, b) => {
        let aVal = a[this.sortField];
        let bVal = b[this.sortField];

        if (this.sortField === 'total') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        } else if (this.sortField === 'orderDate') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else {
          aVal = aVal.toString().toLowerCase();
          bVal = bVal.toString().toLowerCase();
        }

        if (this.sortDirection === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    },

    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }
      this.filterOrders();
    },

    toggleAll(checked) {
      if (checked) {
        this.selectedOrders = this.paginatedOrders.map(o => o.id);
      } else {
        this.selectedOrders = [];
      }
    },

    bulkAction(action) {
      if (this.selectedOrders.length === 0) return;

      const selectedOrderObjects = this.orders.filter(o => 
        this.selectedOrders.includes(o.id)
      );

   switch (action) {
    case 'Đang xử lý':
        selectedOrderObjects.forEach(order => {
            if (order.status === 'Đang chờ') { 
                order.status = 'Đang xử lý';
            }
        });
        this.showNotification('Đã chuyển trạng thái sang: Đang xử lý!', 'success');
        break;

    case 'Đã phát hành': 
        selectedOrderObjects.forEach(order => {
            if (order.status === 'Đang xử lý') {
                order.status = 'Đã phát hành';
            }
        });
        this.showNotification('Đã chuyển trạng thái sang: Đã phát hành!', 'success');
        break;

    case 'Đã hoàn thành': 
        selectedOrderObjects.forEach(order => {
            if (order.status === 'Đã phát hành') {
                order.status = 'Đã hoàn thành';
            }
        });
        this.showNotification('Đã chuyển trạng thái sang: Đã hoàn thành!', 'success');
        break;
}
      this.selectedOrders = [];
      this.calculateStats();
    },

    viewOrder(order) {
      console.log('View order:', order);
      this.showNotification('Order details would open here', 'info');
    },

    trackOrder(order) {
      console.log('Track order:', order);
      this.showNotification('Order tracking would open here', 'info');
    },

    printInvoice(order) {
      console.log('Print invoice for order:', order);
      this.showNotification('Invoice would be generated and printed', 'info');
    },

    cancelOrder(order) {
      if (confirm(`Are you sure you want to cancel order ${order.orderNumber}?`)) {
        order.status = 'cancelled';
        this.calculateStats();
        this.showNotification('Order cancelled successfully!', 'success');
      }
    },

    exportOrders() {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Order Number,Customer,Email,Items,Total,Status,Date\n" +
        this.filteredOrders.map(o => 
          `"${o.orderNumber}","${o.customer.name}","${o.customer.email}","${o.itemCount}","${o.total}","${o.status}","${o.orderDate}"`
        ).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "orders.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showNotification('Orders exported successfully!', 'success');
    },

    showNotification(message, type = 'info') {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: message,
          icon: type === 'success' ? 'success' : type === 'error' ? 'error' : 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        alert(message);
      }
    },

    initCharts() {
      // Prevent multiple chart initializations
      if (this.chartsInitialized) return;
      
      this.initOrderTrendsChart();
      this.initStatusChart();
      this.chartsInitialized = true;
    },

initOrderTrendsChart() {
  const chartElement = document.getElementById('orderTrendsChart');
  if (!chartElement) {
    console.warn('Không tìm thấy phần tử biểu đồ xu hướng');
    return;
  }

  chartElement.innerHTML = '';

  try {
    const trendsData = {
      series: [{
        name: 'Số lượng vé', // Đã sửa từ 'Orders'
        data: [12, 19, 15, 27, 24, 32, 28]
      }, {
        name: 'Doanh thu', // Đã sửa từ 'Revenue'
        data: [1200, 1900, 1500, 2700, 2400, 3200, 2800]
      }],
      chart: {
        type: 'area',
        height: 300,
        toolbar: { show: false }
      },
      colors: ['#6366f1', '#10b981'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        // Việt hóa các ngày trong tuần
        categories: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
      },
      yaxis: [{
        title: {
          text: 'Số lượng vé' // Đã sửa tiêu đề trục Y bên trái
        }
      }, {
        opposite: true,
        title: {
          text: 'Doanh thu (VNĐ)' // Đã sửa tiêu đề trục Y bên phải
        }
      }],
      tooltip: {
        y: [{
          formatter: function (val) {
            return val + " vé" // Việt hóa đơn vị tooltip số lượng
          }
        }, {
          formatter: function (val) {
            return val.toLocaleString('vi-VN') + " VNĐ" // Việt hóa đơn vị tiền tệ và định dạng số
          }
        }]
      }
    };

    const chart = new ApexCharts(chartElement, trendsData);
    chart.render();
  } catch (error) {
    console.error('Lỗi khi vẽ biểu đồ xu hướng đơn vé:', error);
  }
},

    initStatusChart() {
    const chartElement = document.getElementById('statusChart');
    if (!chartElement) {
        console.warn('Không tìm thấy phần tử biểu đồ trạng thái');
        return;
    }

    // Xóa nội dung biểu đồ cũ nếu có
    chartElement.innerHTML = '';

    try {
        const chartData = {
            // Dữ liệu số lượng (đã tính từ calculateStats)
            series: this.statusStats.map(stat => stat.count),
            chart: {
                type: 'donut',
                height: 200
            },
            // Nhãn hiển thị (Sẽ lấy tên tiếng Việt từ hàm calculateStats: "Đang chờ", "Đang xử lý"...)
            labels: this.statusStats.map(stat => {
                const mapVN = {
                    'delivered': 'Đã hoàn thành',
                    'pending': 'Đang chờ',
                    'processing': 'Đang xử lý',
                    'shipped': 'Đã phát hành',
                    'cancelled': 'Đã hủy'
                };
                return mapVN[stat.name.toLowerCase()] || stat.name;
            }),
            colors: this.statusStats.map(stat => stat.color),
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        // Bạn có thể thêm nhãn tổng số vé ở giữa hình tròn
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Tổng cộng',
                                formatter: () => this.stats.total
                            }
                        }
                    }
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                y: {
                    // Việt hóa đơn vị hiển thị khi di chuột vào biểu đồ
                    formatter: function (val) {
                        return val + " vé";
                    }
                }
            }
        };

        const chart = new ApexCharts(chartElement, chartData);
        chart.render();
    } catch (error) {
        console.error('Lỗi khi hiển thị biểu đồ trạng thái:', error);
    }
},

get paginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredOrders.slice(start, end);
},
    get totalPages() {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    },

    get visiblePages() {
      if (this.totalPages <= 1) return [1];

      const pages = [];

      // Always show first page
      pages.push(1);
      
      if (this.totalPages <= 7) {
        // If total pages is small, show all
        for (let i = 2; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Complex pagination logic
        if (this.currentPage <= 4) {
          // Near the beginning
          for (let i = 2; i <= 5; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(this.totalPages);
        } else if (this.currentPage >= this.totalPages - 3) {
          // Near the end
          pages.push('...');
          for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
            pages.push(i);
          }
        } else {
          // In the middle
          pages.push('...');
          for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(this.totalPages);
        }
      }
      
      return pages;
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }));

  // Search component for header
  Alpine.data('searchComponent', () => ({
    query: '',
    results: [],
    
    search() {
      console.log('Searching for:', this.query);
      this.results = [];
    }
  }));

  // Theme switch component
  Alpine.data('themeSwitch', () => ({
    currentTheme: 'light',

    init() {
      this.currentTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    },

    toggle() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    }
  }));
});