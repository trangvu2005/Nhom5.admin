import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('productTable', () => ({
    products: [],
    filteredProducts: [],
    selectedProducts: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    categoryFilter: '',
    stockFilter: '',
    sortField: 'name',
    sortDirection: 'asc',
    isLoading: false,
    chartsInitialized: false,

    // Statistics
    stats: {
      total: 0,
      inStock: 0,
      lowStock: 0,
      totalValue: 0
    },

    categoryStats: [],

    init() {
      this.loadSampleData();
      this.filterProducts();
      this.calculateStats();
      
      // Delay chart initialization to ensure DOM is fully ready
      setTimeout(() => {
        this.initCharts();
      }, 500);
    },

    loadSampleData() {
      this.products = [
        {
    id: 1,
    name: "AI TRONG DOANH NGHIỆP – TỪ CHATBOTS ĐẾN TỰ ĐỘNG HÓA",
    sku: "WS-AI-01",
    category: "Workshop",
    price: 0,
    stock: 70,
    status: "published",
    datetime: "18g00 – 20g30, ngày 16/10/2025",
    location: "B1.204",
    organizer: "Trường Công nghệ và Thiết kế - Trung tâm CNTT & Thiết kế (UEH)",
    target: "Sinh viên, Người đi làm, Doanh nghiệp",
    type: "Trực tiếp"
  },
  {
    id: 2,
    name: "STORYTELLING THỜI AI – KHI DỮ LIỆU VÀ CẢM XÚC GẶP NHAU",
    sku: "WB-AI-02",
    category: "Webinar",
    price: 0,
    stock: 65,
    status: "published",
    datetime: "14g00 – 15g30, ngày 06/09/2025",
    location: "Zoom",
    organizer: "Trường Công nghệ và Thiết kế - Trung tâm CNTT & Thiết kế (UEH)",
    target: "Sinh viên Marketing, Content Creator",
    type: "Trực tuyến"
  },
  {
    id: 3,
    name: "LỄ TUYÊN DƯƠNG SINH VIÊN 5 TỐT VÀ CÁN BỘ ĐOÀN - HỘI XUẤT SẮC 2025",
    sku: "CE-TH-03",
    category: "Ceremony",
    price: 0,
    stock: 45,
    status: "published",
    datetime: "18h00 ngày 15/12/2025",
    location: "B1.302",
    organizer: "Đoàn - Hội Khoa Toán - Thống Kê UEH",
    target: "Sinh viên UEH",
    type: "Trực tiếp"
  },
  {
    id: 4,
    name: "“HORIZON” - CHUNG TAY KIẾN TẠO TƯƠNG LAI DU LỊCH BỀN VỮNG",
    sku: "CT-DL-04",
    category: "Cuộc thi",
    price: 10000,
    stock: 999,
    status: "published",
    datetime: "23/09 - 20/10/2025",
    location: "Online",
    organizer: "Đoàn – Hội Khoa Du lịch UEH",
    target: "Sinh viên các trường đại học tại TP.HCM",
    type: "Trực tuyến"
  },
  {
    id: 5,
    name: "DNA – CUỘC THI HỌC THUẬT CHUYÊN NGÀNH TỔ CHỨC SỰ KIỆN",
    sku: "CT-DL-05",
    category: "Cuộc thi",
    price: 10000,
    stock: 999,
    status: "published",
    datetime: "20/09/2025 – 29/10/2025",
    location: "Hệ thống UEH Quiz & Offline",
    organizer: "Đoàn – Hội Khoa Du lịch UEH",
    target: "Sinh viên đam mê ngành sự kiện",
    type: "Kết hợp"
  },
  {
    id: 6,
    name: "ZEENIVERSE BY U – SÁNG TẠO VŨ TRỤ ĐẠI HỌC XANH UEH",
    sku: "CT-GC-06",
    category: "Cuộc thi",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "08/11/2025 – 20/12/2025",
    location: "Online",
    organizer: "Dự án UEH Green Campus",
    target: "Sinh viên hệ Đại học chính quy UEH",
    type: "Trực tuyến"
  },
  {
    id: 7,
    name: "JOB WHISPERER: HÉ LỘ BỨC MÀN TUYỂN DỤNG",
    sku: "WS-KT-07",
    category: "Workshop",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "18h00, ngày 22/11/2025",
    location: "Online",
    organizer: "Đoàn – Hội Khoa Kinh tế UEH",
    target: "Sinh viên Đại học Kinh tế TP. Hồ Chí Minh",
    type: "Trực tuyến"
  },
  {
    id: 8,
    name: "NỐI VÒNG TAY LỚN 2025: GLOW TRACK",
    sku: "FE-SV-08",
    category: "Festival",
    price: 0,
    stock: 500,
    status: "published",
    datetime: "08/10/2025 – 11/10/2025",
    location: "Cơ sở A, B, N",
    organizer: "Hội Sinh viên Đại học Kinh tế TP. Hồ Chí Minh",
    target: "Tân sinh viên khóa 51 và sinh viên UEH",
    type: "Trực tiếp"
  },
  {
    id: 9,
    name: "GROWTH HACKING ĐỘT PHÁ TĂNG TRƯỞNG 2025",
    sku: "WB-DM-09",
    category: "Webinar",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "14h00, ngày 14/12/2024",
    location: "Online",
    organizer: "Trường Công nghệ và Thiết kế - Trung tâm CNTT & Thiết kế",
    target: "Marketer, Startup, Nhà quản lý",
    type: "Trực tuyến"
  },
  {
    id: 10,
    name: "QUẢN LÝ DỰ ÁN CHUYỂN ĐỔI SỐ",
    sku: "WS-PM-10",
    category: "Workshop",
    price: 0,
    stock: 80,
    status: "published",
    datetime: "08g30, ngày 23/11/2024",
    location: "UEH cơ sở B",
    organizer: "Trường Công nghệ và Thiết kế - Trung tâm CNTT & Thiết kế",
    target: "Sinh viên năm cuối, Người đi làm",
    type: "Trực tiếp"
  },
  {
    id: 11,
    name: "UEH CINEBOX – PHIM: SÀI GÒN, ANH YÊU EM",
    sku: "FE-CB-11",
    category: "Festival",
    price: 15000,
    stock: 45,
    status: "published",
    datetime: "17g00, ngày 07/10/2025",
    location: "B1.302",
    organizer: "Đội Cộng Tác Viên UEH & CLB Tiếng Pháp",
    target: "Sinh viên Đại học Kinh tế TP. Hồ Chí Minh",
    type: "Trực tiếp"
  },
  {
    id: 12,
    name: "NÂNG HẠNG THỊ TRƯỜNG CHỨNG KHOÁN VIỆT NAM",
    sku: "WS-SC-12",
    category: "Workshop",
    price: 0,
    stock: 60,
    status: "published",
    datetime: "08h00, ngày 27/09/2025",
    location: "B1.302",
    organizer: "CLB Chứng khoán SCUE – UEH",
    target: "Sinh viên quan tâm tài chính - chứng khoán",
    type: "Trực tiếp"
  },
  {
    id: 13,
    name: "CƠ HỘI NGHỀ NGHIỆP TRONG LĨNH VỰC AI VÀ WEB3",
    sku: "WS-ET-13",
    category: "Workshop",
    price: 0,
    stock: 30,
    status: "published",
    datetime: "13:30 – 16:00, ngày 18/10/2024",
    location: "B1.303",
    organizer: "ET Club & VBI Academy, UEH",
    target: "Sinh viên quan tâm công nghệ, AI, Web3",
    type: "Trực tiếp"
  },
  {
    id: 14,
    name: "INTEL-LEGACY: CONTROL THE INFINITE MOTION",
    sku: "WS-BL-14",
    category: "Workshop",
    price: 0,
    stock: 60,
    status: "published",
    datetime: "18h00, 05/09/2025",
    location: "Hội trường B1.302",
    organizer: "BELL Club - UEH",
    target: "Sinh viên quan tâm AI và phát triển bền vững",
    type: "Trực tiếp"
  },
  {
    id: 15,
    name: "GREEN BUSINESS SHOWCASE",
    sku: "TS-TC-15",
    category: "Talkshow",
    price: 0,
    stock: 30,
    status: "published",
    datetime: "28/08/2025",
    location: "B1.302",
    organizer: "Đoàn - Hội khoa Tài chính công UEH",
    target: "Sinh viên Đại học Kinh tế TP. Hồ Chí Minh",
    type: "Trực tiếp"
  },
  {
    id: 16,
    name: "DU LỊCH VÀ CUỘC SỐNG 2025 - LUMINARIS",
    sku: "CE-TG-16",
    category: "Ceremony",
    price: 0,
    stock: 43,
    status: "published",
    datetime: "18h00, ngày 30/11/2025",
    location: "Hội trường A.116",
    organizer: "Travelgroup UEH",
    target: "Học sinh, sinh viên TP.HCM",
    type: "Trực tiếp"
  },
  {
    id: 17,
    name: "LỄ TUYÊN DƯƠNG 2025 - FRONTLINE",
    sku: "CE-KT-17",
    category: "Ceremony",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "02/12/2025 – 09/12/2025",
    location: "Online",
    organizer: "Khoa Kế toán UEH",
    target: "Sinh viên Khoa Kế toán, UEH",
    type: "Bình chọn trực tuyến"
  },
  {
    id: 18,
    name: "BẢN ĐỒ IKIGAI: HÀNH TRÌNH KHÁM PHÁ CHÍNH MÌNH",
    sku: "WB-IK-18",
    category: "Webinar",
    price: 0,
    stock: 53,
    status: "published",
    datetime: "09:00 – 11:00, ngày 08/12/2024",
    location: "Online",
    organizer: "Trường Công nghệ và Thiết kế - Trung tâm CNTT & Thiết kế",
    target: "Sinh viên phát triển bản thân",
    type: "Trực tuyến"
  },
  {
    id: 19,
    name: "AN TOÀN TÌNH DỤC - CUDDLE",
    sku: "TS-BT-19",
    category: "Talkshow",
    price: 0,
    stock: 19,
    status: "published",
    datetime: "17h30, ngày 15/12/2025",
    location: "B1.205",
    organizer: "Đoàn - Hội Khoa Công nghệ thông tin kinh doanh",
    target: "Toàn thể sinh viên UEH",
    type: "Trực tiếp"
  },
  {
    id: 20,
    name: "ĐỊNH HƯỚNG NGHỀ NGHIỆP CYBER SECURITY - PIN",
    sku: "TS-BT-20",
    category: "Talkshow",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "17h45, ngày 13/11/2025",
    location: "Online",
    organizer: "Đoàn - Hội Khoa Công nghệ thông tin kinh doanh",
    target: "Toàn thể sinh viên UEH",
    type: "Trực tuyến"
  }
      ];
    },

    calculateStats() {
      this.stats.total = this.products.length;
      this.stats.inStock = this.products.filter(p => p.stock > 20).length;
      this.stats.lowStock = this.products.filter(p => p.stock > 0 && p.stock <= 20).length;
      this.stats.totalValue = this.products.reduce((sum, p) => sum + (p.price * p.stock), 0);

      // Calculate category distribution
      const categories = {};
      this.products.forEach(product => {
        categories[product.category] = (categories[product.category] || 0) + 1;
      });

      this.categoryStats = Object.entries(categories).map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count,
        percentage: Math.round((count / this.products.length) * 100),
        color: this.getCategoryColor(name)
      }));
    },

        getCategoryColor(category) {
        const colors = {
        'Workshop': '#2d5a6e',           // Xanh đậm (Dark Teal)
        'Webinar': '#4a3721',            // Nâu đậm (Dark Brown)
        'Talkshow': '#0056b3',           // Xanh dương (Royal Blue)
        'Cuộc thi': '#b30000',           // Đỏ đậm (Crimson Red)
        'Ceremony': '#fce18a',           // Vàng nhạt (Light Gold)
        'Festival': '#f8d7da',           // Hồng nhạt (Light Pink)
        'Văn hóa - Nghệ thuật': '#5a3791' // Tím (Deep Purple)
      };
      
      // Trả về màu theo danh mục, nếu không tìm thấy trả về màu xám mặc định
      return colors[category] || '#6b7280'; 
    },

    filterProducts() {
      this.filteredProducts = this.products.filter(product => {
        const matchesSearch = !this.searchQuery || 
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchesCategory = !this.categoryFilter || product.category === this.categoryFilter;
        
        const matchesStock = !this.stockFilter || 
          (this.stockFilter === 'in-stock' && product.stock > 20) ||
          (this.stockFilter === 'low-stock' && product.stock > 0 && product.stock <= 20) ||
          (this.stockFilter === 'out-of-stock' && product.stock === 0);

        return matchesSearch && matchesCategory && matchesStock;
      });

      this.sortProducts();
      this.currentPage = 1;
    },

    sortProducts() {
      this.filteredProducts.sort((a, b) => {
        let aVal = a[this.sortField];
        let bVal = b[this.sortField];

        if (this.sortField === 'price' || this.sortField === 'stock') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        } else if (this.sortField === 'created') {
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
      this.filterProducts();
    },

    toggleAll(checked) {
      if (checked) {
        this.selectedProducts = this.paginatedProducts.map(p => p.id);
      } else {
        this.selectedProducts = [];
      }
    },

    bulkAction(action) {
      if (this.selectedProducts.length === 0) return;

      const selectedProductObjects = this.products.filter(p => 
        this.selectedProducts.includes(p.id)
      );

      switch (action) {
        case 'publish':
          selectedProductObjects.forEach(product => {
            product.status = 'published';
          });
          this.showNotification('Products published successfully!', 'success');
          break;
        case 'unpublish':
          selectedProductObjects.forEach(product => {
            product.status = 'draft';
          });
          this.showNotification('Products unpublished successfully!', 'info');
          break;
        case 'delete':
          if (confirm(`Are you sure you want to delete ${this.selectedProducts.length} product(s)?`)) {
            this.products = this.products.filter(p => 
              !this.selectedProducts.includes(p.id)
            );
            this.filterProducts();
            this.calculateStats();
            this.showNotification('Products deleted successfully!', 'success');
          }
          break;
      }

      this.selectedProducts = [];
    },

    editProduct(product) {
      console.log('Edit product:', product);
      this.showNotification('Edit functionality would open here', 'info');
    },

    viewProduct(product) {
      console.log('View product:', product);
      this.showNotification('Product details would open here', 'info');
    },

    duplicateProduct(product) {
      const newProduct = {
        ...product,
        id: Math.max(...this.products.map(p => p.id)) + 1,
        name: product.name + ' (Copy)',
        sku: product.sku + '-COPY',
        status: 'draft',
        created: new Date().toISOString().split('T')[0]
      };
      this.products.unshift(newProduct);
      this.filterProducts();
      this.calculateStats();
      this.showNotification('Product duplicated successfully!', 'success');
    },

    deleteProduct(product) {
      if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        this.products = this.products.filter(p => p.id !== product.id);
        this.filterProducts();
        this.calculateStats();
        this.showNotification('Product deleted successfully!', 'success');
      }
    },

    exportProducts() {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Name,SKU,Category,Price,Stock,Status,Created\n" +
        this.filteredProducts.map(p => 
          `"${p.name}","${p.sku}","${p.category}","${p.price}","${p.stock}","${p.status}","${p.created}"`
        ).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "products.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showNotification('Products exported successfully!', 'success');
    },

    showNotification(message, type = 'info') {
      // Integration with SweetAlert2 or browser notification
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
      
      this.initSalesChart();
      this.initCategoryChart();
      this.chartsInitialized = true;
    },

    initSalesChart() {
      const salesChart = document.getElementById('salesChart');
      if (!salesChart) {
        console.warn('Sales chart element not found');
        return;
      }

      // Clear any existing chart content
      salesChart.innerHTML = '';

      try {

      // Sample sales data
      const salesData = {
        series: [{
          name: 'Sales',
          data: [65, 78, 85, 92, 88, 95, 102]
        }],
        chart: {
          type: 'area',
          height: 300,
          toolbar: { show: false }
        },
        colors: ['#6366f1'],
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
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yaxis: {
          title: {
            text: 'Sales ($1000s)'
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$" + val + "k"
            }
          }
        }
      };

        const chart = new ApexCharts(salesChart, salesData);
        chart.render();
      } catch (error) {
        console.error('Error rendering sales chart:', error);
      }
    },

    initCategoryChart() {
      const categoryChart = document.getElementById('categoryChart');
      if (!categoryChart) {
        console.warn('Category chart element not found');
        return;
      }

      // Clear any existing chart content
      categoryChart.innerHTML = '';

      try {

      const chartData = {
        series: this.categoryStats.map(cat => cat.count),
        chart: {
          type: 'donut',
          height: 200
        },
        labels: this.categoryStats.map(cat => cat.name),
        colors: this.categoryStats.map(cat => cat.color),
        plotOptions: {
          pie: {
            donut: {
              size: '70%'
            }
          }
        },
        legend: {
          show: false
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " products"
            }
          }
        }
      };

        const chart = new ApexCharts(categoryChart, chartData);
        chart.render();
      } catch (error) {
        console.error('Error rendering category chart:', error);
      }
    },

    get paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },

    get totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
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

  // Product form component for modals
  Alpine.data('productForm', () => ({
    form: {
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      status: 'draft'
    },

    saveProduct() {
      // Validation
      if (!this.form.name || !this.form.sku || !this.form.category || 
          !this.form.price || !this.form.stock || !this.form.status) {
        alert('Please fill in all required fields');
        return;
      }

      console.log('Saving product:', this.form);
      
      // In a real app, this would make an API call
      // For now, just show success message
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Product Saved!',
          text: 'The product has been saved successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        alert('Product saved successfully!');
      }

      // Reset form
      this.form = {
        name: '',
        sku: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        status: 'draft'
      };
    }
  }));

  // Search component for header
  Alpine.data('searchComponent', () => ({
    query: '',
    
    search() {
      console.log('Searching for:', this.query);
      // Implement search functionality
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