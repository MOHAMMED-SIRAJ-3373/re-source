/* ==========================================================================
   Re-Source — Central Reactive Store & LocalStorage Persistence
   ========================================================================== */

const INITIAL_PRODUCTS = [
  { id: 1, name: "Solar Panels - Masdar City Installation Surplus", description: "High-efficiency Canadian Solar 450W monocrystalline panels from Masdar City project surplus. Ideal for residential, commercial, or off-grid energy solutions. Lightly used, tested, with robust frames.", category: "Building Materials", condition: "Good", price: 1200, quantity: 15, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", location: "Dubai", created_date: "2025-09-20" },
  { id: 2, name: "Ergonomic Office Chairs (Bulk Lot)", description: "Assorted ergonomic chairs designed for optimal lumbar support and comfort. Adjustable height, swivel, and tilt functions. Gently used in excellent condition, bulk lot of 20 units.", category: "Office Furniture", condition: "Like New", price: 800, quantity: 20, image: "https://images.thdstatic.com/productImages/f88ea17b-9545-4294-859a-da704cc5c2c7/svn/black-costway-guest-office-chairs-hcst01502-64_600.jpg", location: "Sharjah", created_date: "2025-09-28" },
  { id: 3, name: "Server Rack 42U", description: "Dell-certified 42U server rack in excellent condition. Includes lockable doors, cable management, and adjustable mounting rails. Ideal for secure IT server deployment.", category: "IT Hardware", condition: "Like New", price: 1500, quantity: 3, image: "https://download.schneider-electric.com/files?p_Doc_Ref=PB501421&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png", location: "Abu Dhabi", created_date: "2025-10-01" },
  { id: 4, name: "Bulk Laptops (HP, Dell)", description: "Refurbished bulk lot of 15 laptops, perfect for offices or educational institutions. Tested, updated, and pre-installed with productivity software.", category: "IT Hardware", condition: "Good", price: 7000, quantity: 15, image: "https://cpimg.tistatic.com/08230342/b/5/extra-08230342.jpg", location: "Dubai", created_date: "2025-08-15" },
  { id: 5, name: "Industrial Air Compressor", description: "Heavy-duty 185 CFM compressor, ideal for workshops or small manufacturing. Recently serviced, suitable for pneumatic tools and spray painting.", category: "Machinery", condition: "Good", price: 4000, quantity: 2, image: "/assets/build.jpg", location: "Sharjah", created_date: "2025-07-12" },
  { id: 6, name: "Forklift (Electric)", description: "Electric forklift with low hours, fully functional, eco-friendly, and perfect for warehouses or factories. Easy maneuverability with safety features.", category: "Vehicles", condition: "Like New", price: 9000, quantity: 1, image: "https://cdn.truckscout24.com/data/listing/img/vga/ts/10/34/19609211-01.jpg?v=1755003969", location: "Dubai", created_date: "2025-06-20" },
  { id: 7, name: "Pallets of Branded Headphones", description: "Bulk lot of 25 open-box branded headphones. Tested for quality and functionality. Ideal for resale or promotional purposes.", category: "Electronics", condition: "Like New", price: 4800, quantity: 25, image: "https://images.merstatic.com/imgcache/resized/images/offer/2021/05/11/whatsapp-image-2021-05-10-at-140944-4-1620725042-1620725659.jpeg", location: "Dubai", created_date: "2025-10-14" },
  { id: 8, name: "Construction Tools Bulk Lot", description: "Mixed set of tools for construction businesses. Includes hammers, drills, saws, and measuring equipment. All tools functional.", category: "Tools", condition: "Fair", price: 650, quantity: 30, image: "/assets/construction.jpg", location: "Ajman", created_date: "2025-08-05" },
  { id: 9, name: "Building Materials — Tiles (Pallet)", description: "Mixed-size ceramic and porcelain tiles. Durable, scratch-resistant, perfect for renovations or construction projects.", category: "Building Materials", condition: "New", price: 2200, quantity: 50, image: "https://www.shutterstock.com/image-photo/paving-slabs-factory-tiles-piled-260nw-1060959992.jpg", location: "Dubai", created_date: "2025-06-11" },
  { id: 10, name: "LED Monitors (Bulk Lot)", description: "20 units of 24-inch LED monitors, full HD resolution, energy-efficient, slim design. Ideal for office setups or training centers.", category: "IT Hardware", condition: "Like New", price: 4000, quantity: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSebJQFV7qRu0TOg_63AE2U6WQrJoL_E2hwpg&s", location: "Sharjah", created_date: "2025-09-30" },
  { id: 11, name: "Medical Equipment - Abu Dhabi Upgrade Surplus", description: "Hospital-grade furniture and equipment from Abu Dhabi modernization. Includes adjustable patient beds, examination tables, and storage units.", category: "Medical Equipment", condition: "Like New", price: 8000, quantity: 5, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80", location: "Abu Dhabi", created_date: "2025-10-18" },
  { id: 12, name: "Air Conditioning Units - Sharjah Villa Complex", description: "Split AC units (1.5-3 ton) from Sharjah renovation. Brands: Samsung, LG, Daikin. Energy-efficient, excellent working condition.", category: "Industrial Equipment", condition: "Like New", price: 3500, quantity: 10, image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80", location: "Sharjah", created_date: "2025-10-18" }
];

class Store {
  constructor() {
    this.listeners = [];
    this.state = {
      theme: localStorage.getItem('resource_theme') || 'light',
      user: JSON.parse(localStorage.getItem('resource_user')) || null,
      products: JSON.parse(localStorage.getItem('resource_products')) || INITIAL_PRODUCTS,
      userListings: JSON.parse(localStorage.getItem('resource_user_listings')) || [
        { id: 101, img: '/assets/construction.jpg', name: 'Aluminum Sheets', qty: '500 kg', loc: 'Sharjah', sold: false },
        { id: 102, img: '/assets/fast.jpg', name: 'Used PVC Pipes', qty: '200 units', loc: 'Dubai', sold: true },
        { id: 103, img: '/assets/build.jpg', name: 'Wooden Pallets', qty: '350 units', loc: 'Abu Dhabi', sold: false }
      ],
      orders: JSON.parse(localStorage.getItem('resource_orders')) || []
    };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Theme Action
  toggleTheme() {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('resource_theme', this.state.theme);
    if (this.state.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    this.notify();
  }

  // Auth Actions
  setUser(userData) {
    this.state.user = userData;
    localStorage.setItem('resource_user', JSON.stringify(userData));
    this.notify();
  }

  logout() {
    this.state.user = null;
    localStorage.removeItem('resource_user');
    this.notify();
  }

  // Product Actions
  addProduct(newProduct) {
    const product = {
      id: Date.now(),
      created_date: new Date().toISOString().split('T')[0],
      ...newProduct
    };
    this.state.products.unshift(product);
    localStorage.setItem('resource_products', JSON.stringify(this.state.products));
    
    // Also add to user listings
    this.state.userListings.unshift({
      id: product.id,
      img: product.image || '/assets/build.jpg',
      name: product.name,
      qty: `${product.quantity} units`,
      loc: product.location,
      sold: false
    });
    localStorage.setItem('resource_user_listings', JSON.stringify(this.state.userListings));
    this.notify();
  }

  toggleListingSold(id) {
    const item = this.state.userListings.find(l => l.id === id);
    if (item) {
      item.sold = !item.sold;
      localStorage.setItem('resource_user_listings', JSON.stringify(this.state.userListings));
      this.notify();
    }
  }

  addOrder(order) {
    this.state.orders.push({ id: Date.now(), timestamp: new Date().toISOString(), ...order });
    localStorage.setItem('resource_orders', JSON.stringify(this.state.orders));
    this.notify();
  }
}

export const store = new Store();
