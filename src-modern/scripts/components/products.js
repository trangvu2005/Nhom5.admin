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
    sku: "WK-AI-01",
    category: "electronics", // Học thuật
    price: 0,
    stock: 70,
    status: "published",
    datetime: "18g00 – 20g30, 16/10/2025",
    location: "B1.204",
    organizer: "Trường Công nghệ và Thiết kế (UEH)",
    target: "Sinh viên, học viên, cá nhân ứng dụng AI",
    type: "Trực tiếp"
  },
  {
    id: 2,
    name: "STORYTELLING THỜI AI – KHI DỮ LIỆU VÀ CẢM XÚC GẶP NHAU",
    sku: "WB-AI-02",
    category: "home", // Hội thảo/Webinar
    price: 0,
    stock: 65,
    status: "published",
    datetime: "14g00 – 15g30, 06/09/2025",
    location: "Zoom Online",
    organizer: "Trường Công nghệ và Thiết kế (UEH)",
    target: "Sinh viên Marketing, Content Creator",
    type: "Trực tuyến"
  },
  {
    id: 3,
    name: "LỄ TUYÊN DƯƠNG SINH VIÊN 5 TỐT VÀ CÁN BỘ ĐOÀN - HỘI 2025",
    sku: "CE-SV-03",
    category: "clothing", // Văn nghệ/Lễ hội
    price: 0,
    stock: 45,
    status: "published",
    datetime: "18h00 15/12/2025",
    location: "B1.302",
    organizer: "Đoàn - Hội Khoa Toán - Thống Kê",
    target: "Sinh viên UEH",
    type: "Trực tiếp"
  },
  {
    id: 4,
    name: "“HORIZON” - CHUNG TAY KIẾN TẠO TƯƠNG LAI DU LỊCH BỀN VỮNG",
    sku: "CT-DL-04",
    category: "books", // Cuộc thi
    price: 10000,
    stock: 999,
    status: "published",
    datetime: "23/09 - 20/10/2025",
    location: "Online",
    organizer: "Đoàn – Hội Khoa Du lịch",
    target: "Sinh viên các trường ĐH tại TP.HCM",
    type: "Trực tuyến"
  },
  {
    id: 5,
    name: "DNA – CUỘC THI HỌC THUẬT CHUYÊN NGÀNH TỔ CHỨC SỰ KIỆN",
    sku: "CT-DL-05",
    category: "books",
    price: 10000,
    stock: 999,
    status: "published",
    datetime: "20/09 – 29/10/2025",
    location: "UEH Quiz & Offline",
    organizer: "Đoàn – Hội Khoa Du lịch",
    target: "Sinh viên đam mê ngành sự kiện",
    type: "Kết hợp"
  },
  {
    id: 6,
    name: "ZEENIVERSE BY U – SÁNG TẠO VŨ TRỤ ĐẠI HỌC XANH UEH",
    sku: "CT-GC-06",
    category: "books",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "08/11 – 20/12/2025",
    location: "Online",
    organizer: "Dự án UEH Green Campus",
    target: "Sinh viên hệ chính quy UEH",
    type: "Trực tuyến"
  },
  {
    id: 7,
    name: "JOB WHISPERER: HÉ LỘ BỨC MÀN TUYỂN DỤNG",
    sku: "WK-KT-07",
    category: "electronics",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "18h00, 22/11/2025",
    location: "Online",
    organizer: "Đoàn – Hội Khoa Kinh tế",
    target: "Sinh viên Đại học Kinh tế TP.HCM",
    type: "Trực tuyến"
  },
  {
    id: 8,
    name: "NỐI VÒNG TAY LỚN 2025: GLOW TRACK",
    sku: "FS-SV-08",
    category: "clothing",
    price: 0,
    stock: 0,
    status: "published",
    datetime: "08/10 – 11/10/2025",
    location: "Hội trường A.116",
    organizer: "Hội Sinh viên UEH",
    target: "Tân sinh viên khóa 51 và sinh viên",
    type: "Trực tiếp"
  },
  {
    id: 9,
    name: "GROWTH HACKING ĐỘT PHÁ TĂNG TRƯỞNG 2025",
    sku: "WB-AI-09",
    category: "home",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "14h00, 14/12/2024",
    location: "Online",
    organizer: "Trung tâm CNTT & Thiết kế",
    target: "Doanh nhân, Marketer, Startup",
    type: "Trực tuyến"
  },
  {
    id: 10,
    name: "QUẢN LÝ DỰ ÁN CHUYỂN ĐỔI SỐ",
    sku: "WK-AI-10",
    category: "electronics",
    price: 0,
    stock: 150,
    status: "published",
    datetime: "08g30, 23/11/2024",
    location: "UEH cơ sở B",
    organizer: "Trường Công nghệ và Thiết kế",
    target: "Sinh viên năm cuối, Nhà quản lý",
    type: "Trực tiếp"
  },
  {
    id: 11,
    name: "UEH CINEBOX – BUỔI CHIẾU PHIM: SÀI GÒN, ANH YÊU EM",
    sku: "FS-CTV-11",
    category: "clothing",
    price: 15000,
    stock: 45,
    status: "published",
    datetime: "17g00, 07/10/2025",
    location: "B1.302",
    organizer: "Đội Cộng Tác Viên UEH",
    target: "Sinh viên UEH",
    type: "Trực tiếp"
  },
  {
    id: 12,
    name: "NÂNG HẠNG THỊ TRƯỜNG CHỨNG KHOÁN VIỆT NAM",
    sku: "WK-TC-12",
    category: "electronics",
    price: 0,
    stock: 60,
    status: "published",
    datetime: "08h00, 27/09/2025",
    location: "B1.302",
    organizer: "CLB Chứng khoán SCUE",
    target: "Sinh viên quan tâm Tài chính",
    type: "Trực tiếp"
  },
  {
    id: 13,
    name: "CƠ HỘI NGHỀ NGHIỆP TRONG LĨNH VỰC AI VÀ WEB3",
    sku: "WK-CN-13",
    category: "electronics",
    price: 0,
    stock: 30,
    status: "published",
    datetime: "13:30 – 16:00, 18/10/2024",
    location: "B1.303",
    organizer: "ET Club & VBI Academy",
    target: "Sinh viên quan tâm Công nghệ",
    type: "Trực tiếp"
  },
  {
    id: 14,
    name: "INTEL-LEGACY: CONTROL THE INFINITE MOTION",
    sku: "WK-CN-14",
    category: "electronics",
    price: 0,
    stock: 60,
    status: "published",
    datetime: "18h00, 05/09/2025",
    location: "Hội trường B1.302",
    organizer: "BELL Club - UEH",
    target: "Sinh viên UEH",
    type: "Trực tiếp"
  },
  {
    id: 15,
    name: "GREEN BUSINESS SHOWCASE",
    sku: "TS-TC-15",
    category: "home",
    price: 0,
    stock: 30,
    status: "published",
    datetime: "28/08/2025",
    location: "B1.302",
    organizer: "Đoàn - Hội khoa Tài chính công",
    target: "Sinh viên UEH",
    type: "Trực tiếp"
  },
  {
    id: 16,
    name: "DU LỊCH VÀ CUỘC SỐNG 2025 - LUMINARIS",
    sku: "CE-DL-16",
    category: "clothing",
    price: 0,
    stock: 43,
    status: "published",
    datetime: "18h00, 30/11/2025",
    location: "Hội trường A.116",
    organizer: "Travelgroup UEH",
    target: "Học sinh, sinh viên TP.HCM",
    type: "Trực tiếp"
  },
  {
    id: 17,
    name: "LỄ TUYÊN DƯƠNG 2025 - FRONTLINE",
    sku: "CE-KT-17",
    category: "home",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "02/12 – 09/12/2025",
    location: "Online",
    organizer: "Khoa Kế toán UEH",
    target: "Sinh viên Khoa Kế toán",
    type: "Trực tuyến"
  },
  {
    id: 18,
    name: "BẢN ĐỒ IKIGAI: HÀNH TRÌNH KHÁM PHÁ CHÍNH MÌNH",
    sku: "WB-TD-18",
    category: "home",
    price: 0,
    stock: 53,
    status: "published",
    datetime: "09:00 – 11:00, 08/12/2024",
    location: "Online",
    organizer: "Trung tâm CNTT & Thiết kế",
    target: "Người quan tâm phát triển bản thân",
    type: "Trực tuyến"
  },
  {
    id: 19,
    name: "AN TOÀN TÌNH DỤC - CUDDLE",
    sku: "TS-TH-19",
    category: "home",
    price: 0,
    stock: 19,
    status: "published",
    datetime: "17h30, 15/12/2025",
    location: "B1.205",
    organizer: "Đoàn - Hội Khoa BIT",
    target: "Toàn thể sinh viên UEH",
    type: "Trực tiếp"
  },
  {
    id: 20,
    name: "ĐỊNH HƯỚNG NGHỀ NGHIỆP NGÀNH CYBER SECURITY",
    sku: "TS-TH-20",
    category: "electronics",
    price: 0,
    stock: 999,
    status: "published",
    datetime: "17h45, 13/11/2025",
    location: "Online",
    organizer: "Đoàn - Hội Khoa BIT",
    target: "Sinh viên UEH",
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
        electronics: '#6366f1',
        clothing: '#8b5cf6',
        books: '#06b6d4',
        home: '#10b981'
      };
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