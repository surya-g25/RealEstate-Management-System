export const adminContactsStyles = {
  container: "mb-10",
  heading: "text-[2rem] font-extrabold text-text-main mb-2",
  subheading: "text-text-muted text-[0.9rem]",
  card: "card-premium p-0 overflow-hidden",
  cardHeader: "border-b border-[#f1f5f9] p-6 flex justify-between items-center",
  cardTitle: "text-[1.2rem] font-extrabold",
  emptyState: "p-16 text-center text-text-muted",
  emptyIcon: "opacity-20 mb-4 mx-auto",
  contactList: "flex flex-col",
  contactItem: (index, total) => `p-5 sm:p-8 bg-white transition-all duration-300 ease-in-out border-b ${index !== total - 1 ? 'border-[#f1f5f9]' : 'border-transparent'}`,
  contactHeader: "flex flex-col sm:flex-row justify-between items-start mb-6 gap-4 sm:gap-0",
  avatarWrapper: (role) => `w-14 h-14 rounded-full flex items-center justify-center font-bold text-[1.25rem] shrink-0 ${role === 'seller' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#dbeafe] text-[#1e40af]'}`,
  nameBadgeContainer: "flex items-center gap-3 mb-1 flex-wrap",
  name: "text-[1.1rem] font-extrabold text-text-main",
  roleBadge: (role) => `text-[0.7rem] px-[0.6rem] py-[0.2rem] rounded-full font-bold uppercase ${role === 'seller' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#dbeafe] text-[#1e40af]'}`,
  contactDetails: "flex flex-col sm:flex-row gap-2 sm:gap-6 sm:flex-wrap mt-2 sm:mt-0",
  detailItem: "flex items-center gap-[0.4rem] text-[0.85rem] text-text-muted break-all sm:break-normal",
  messageBox: "bg-[#f8fafc] p-4 sm:py-5 sm:px-6 rounded-2xl text-[0.95rem] leading-[1.6] text-[#334155] border border-[#f1f5f9]",
};

export const adminDashboardStyles = {
  // Loader
  loaderFullPage: "loader-full-page",
  loader: "loader",

  // Header section
  headerContainer: "flex justify-between items-start mb-8 flex-wrap gap-6",
  pageTitle: "text-[1.75rem] font-extrabold text-text-main mb-1",
  pageSubtitle: "text-text-muted text-[0.9375rem]",
  refreshButton: "btn btn-outline py-[0.6rem] px-5 text-[0.875rem] bg-white",

  // Stats grid & cards
  statsGrid: "grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 mb-12",
  statCard: "card-premium p-6 flex flex-col gap-4",
  statIconContainer: "w-11 h-11 rounded-[0.875rem] flex items-center justify-center",
  statTitle: "text-[0.8125rem] font-semibold text-text-muted mb-1",
  statValue: "text-[1.75rem] font-extrabold text-text-main",

  // Second grid (System Health & Admin Tools)
  secondGrid: "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-8",

  // System Health card
  systemHealthCard: "card-premium p-6",
  systemHealthTitle: "mb-5 text-[1.125rem] font-bold",
  servicesContainer: "flex flex-col gap-5",
  serviceItem: "flex justify-between items-center",
  serviceName: "text-[0.875rem] font-semibold",
  statusContainer: "flex items-center gap-2",
  statusDot: "w-2 h-2 rounded-full bg-[#10b981]",
  statusText: "text-[0.8125rem] text-[#10b981] font-bold",

  // Admin Tools card
  adminToolsCard: "card-premium p-6 bg-primary text-white",
  adminToolsTitle: "mb-3 text-[1.125rem] font-bold",
  adminToolsDesc: "text-[0.8125rem] mb-6 opacity-90",
  adminToolsButtonsContainer: "flex flex-col gap-3",
  adminToolButton: "btn bg-white/20 text-white w-full justify-start text-[0.875rem]",
};

export const adminInquiriesStyles = {
  headerContainer: "mb-12",
  headerTitle: "text-[2rem] font-extrabold text-text-main mb-2",
  headerSubtitle: "text-text-muted",
  listContainer: "admin-inquiries-list flex flex-col gap-6",
  inquiryCard: "card-premium p-6 md:p-8",
  cardTopSection: "flex flex-col sm:flex-row justify-between items-start mb-6 border-b border-[#f1f5f9] pb-6 gap-4 sm:gap-4",
  propertyInfoWrapper: "flex items-center gap-4",
  propertyIconWrapper: "bg-primary-light p-3 rounded-xl text-primary",
  propertyTextWrapper: "w-full sm:w-auto text-left",
  propertyTitle: "font-bold",
  propertyId: "text-xs text-text-muted",
  dateWrapper: "text-sm text-text-muted text-left sm:text-right w-full sm:w-auto",
  dateIcon: "inline align-middle mr-1",
  detailsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6",
  detailCard: "bg-[#f8fafc] p-4 md:p-5 rounded-2xl border border-[#f1f5f9]",
  detailLabel: "text-xs font-bold text-text-muted uppercase mb-3 tracking-widest",
  detailName: "font-bold text-text-main mb-1",
  detailEmail: "text-sm text-text-muted break-all",
  messageContainer: "bg-bg-alt p-6 rounded-2xl border-l-[4px] border-primary",
  messageHeader: "flex items-center gap-2 mb-2 text-primary font-bold text-sm",
  messageText: "italic text-text-main leading-relaxed",
  emptyState: "card-premium py-24 px-8 text-center",
  emptyIconWrapper: "text-text-muted mb-4",
  emptyText: "text-text-muted",
};

export const adminPropertiesStyles = {
  // Loader
  loaderFullPage: "loader-full-page",
  loader: "loader",

  // Header
  headerContainer: "mb-12",
  pageTitle: "text-[2rem] font-extrabold text-text-main mb-2",
  pageSubtitle: "text-text-muted",

  // Empty state
  emptyStateCard: "card-premium p-16 text-center text-[#64748b]",

  propertiesGrid: "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 justify-items-center max-sm:grid-cols-1 max-sm:px-4",

  // Inside PropertyCard renderActions
  actionWrapper: "flex-1 flex gap-2 items-center",
  sellerInfo: "text-[0.75rem] text-[#64748b] flex-1",
  sellerName: "font-bold",
  sellerEmail: "text-[0.7rem]",
  buttonGroup: "flex gap-1",
  viewLink: "btn btn-outline p-2",
  deleteButton: "btn bg-[#fef2f2] text-[#dc2626] p-2 border border-[#fee2e2] hover:bg-red-100",
};

export const adminUsersStyles = {
  containerHeader: "flex justify-between items-start mb-8 flex-wrap gap-4",
  headerTitle: "text-[1.75rem] font-extrabold text-text-main mb-1",
  headerSubtitle: "text-text-muted text-[0.875rem]",
  filterWrapper: "relative",
  filterButton: "flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#e2e8f0] bg-white text-text-main shadow-sm hover:bg-[#f8fafc] transition-all duration-200 cursor-pointer",
  filterDropdown: "absolute right-0 max-sm:left-0 max-sm:right-auto mt-2 w-44 rounded-xl border border-[#e2e8f0] bg-white shadow-lg z-20 overflow-hidden",
  filterOption: (isActive) => `w-full text-left px-4 py-2.5 hover:bg-[#f8fafc] ${isActive ? "font-semibold text-primary" : "text-text-main"}`,
  cardContainer: "card-premium overflow-hidden mb-8 p-0",
  cardHeader: "pt-6 px-6 pb-2",
  cardTitleRow: "flex justify-between items-center mb-4",
  cardTitle: "text-[1.25rem] font-extrabold text-text-main",
  userCount: "text-sm font-semibold text-text-muted",
  userCountSpan: "text-text-main",
  tableWrapper: "overflow-x-auto touch-pan-x",
  table: "w-full border-collapse min-w-[800px]",
  thead: "bg-[#f8fafc] text-[#64748b] text-[0.7rem] font-bold uppercase tracking-[0.05em]",
  tableRow: "border-b border-[#f1f5f9]",
  thUserInfo: "py-4 px-6 text-left",
  thRole: "py-4 px-6 text-center",
  thContact: "py-4 px-6 text-left",
  thStatus: "py-4 px-6 text-center",
  thActions: "py-4 px-6 text-right",
  tdUserInfo: "py-6 px-8",
  userAvatar: "w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold",
  userInfoName: "font-bold text-[0.9375rem]",
  userInfoId: "text-[0.75rem] text-text-muted",
  tdRole: "py-6 px-6 text-center",
  roleBadge: (role) => `px-3 py-1.5 rounded-full text-[0.75rem] font-bold uppercase ${role === "admin" ? "bg-[#fef3c7] text-[#92400e]" :
    role === "seller" ? "bg-[#dcfce7] text-[#166534]" :
      "bg-[#dbeafe] text-[#1e40af]"
    }`,
  tdContact: "py-6 px-6",
  contactWrapper: "flex flex-col gap-1",
  contactEmail: "text-[0.875rem] flex items-center gap-2 text-text-main",
  contactPhone: "text-[0.875rem] flex items-center gap-2 text-text-main",
  tdStatus: "py-6 px-6 text-center",
  statusBadgeBlocked: "text-[#dc2626] text-[0.8125rem] font-bold inline-flex items-center gap-1.5 justify-center bg-[#fff5f5] py-1 px-2 rounded-lg border border-[#fee2e2]",
  statusBadgeActive: "text-[#10b981] text-[0.8125rem] font-bold inline-flex items-center gap-1.5 justify-center bg-[#f0fdf4] py-1 px-2 rounded-lg border border-[#dcfce7]",
  tdActions: "py-6 px-6 text-right",
  actionsWrapper: "flex gap-2 justify-end",
  blockButton: (isBlocked) => `w-9 h-9 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 ${isBlocked ? "text-[#10b981]" : "text-[#f59e0b]"}`,
  deleteButton: "w-9 h-9 rounded-lg border-none bg-[#fef2f2] text-[#dc2626] flex items-center justify-center cursor-pointer hover:bg-red-100",
  emptyState: "py-16 text-center text-text-muted",
};



export const sellerRequestsStyles = {
  // Loader
  loaderFullPage: "loader-full-page",
  loader: "loader",

  // Container & header
  container: "seller-requests-container",
  headerContainer: "mb-8",
  pageTitle: "text-[1.75rem] font-extrabold text-text-main mb-1",
  pageSubtitle: "text-text-muted text-[0.875rem]",

  // Card
  card: "card-premium",
  cardInner: "p-6",
  sectionTitle: "text-[1.25rem] font-extrabold text-text-main mb-6",

  // Empty state
  emptyState: "text-center py-12 text-text-muted",
  emptyStateIcon: "opacity-20 mb-4 mx-auto",

  // Request grid & card
  requestGrid: "grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6 max-sm:grid-cols-1",
  requestCard: "border border-[#f1f5f9] rounded-2xl p-6 bg-[#f8fafc] transition-all duration-300 ease-in-out hover:-translate-y-1",
  requestHeader: "flex items-center gap-4 mb-5",
  avatar: "w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[1.25rem]",
  requestName: "font-bold text-[1.1rem] text-text-main",
  requestDate: "text-[0.75rem] text-text-muted flex items-center gap-1",

  // Contact info
  contactInfo: "flex flex-col gap-3 mb-6",
  contactItem: "flex items-center gap-3 text-[0.9rem] text-[#475569] break-all",

  // Button
  approveButton: "w-full p-3 rounded-xl border-none bg-primary text-white font-bold cursor-pointer flex items-center justify-center gap-2 transition-transform duration-200 ease-in-out hover:-translate-y-[2px]",
};

export const contactStyles = {
  // Layout
  container: "min-h-screen bg-[#f8fafc] pt-32 max-lg:pt-28",
  mainContainer: "container py-16 px-6 max-w-[1000px] mx-auto",

  // Header
  header: "text-center mb-14",
  heading: "text-[2.5rem] font-extrabold text-text-main mb-4",
  subheading: "text-text-muted text-[1.1rem] max-w-[600px] mx-auto",

  // Grid
  grid: "grid grid-cols-[1fr_1.5fr] gap-12 items-start max-lg:grid-cols-1 max-lg:gap-8",

  // Contact Info section
  contactInfoContainer: "flex flex-col gap-8",
  contactInfoCard: "card-premium p-8",
  contactItem: "flex items-center gap-4",
  contactItemMarginBottom: "mb-6",
  contactIconWrapper: "w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center",
  contactIconWrapperAlt: "w-10 h-10 rounded-xl bg-[#dbeafe] text-[#1e40af] flex items-center justify-center",
  contactTitle: "font-bold text-base",
  contactDetail: "text-text-muted text-[0.9rem]",

  // Quick support card
  quickSupportCard: "card-premium h-[200px] bg-primary text-white flex flex-col justify-center items-center p-8 text-center",
  quickSupportTitle: "mb-2 font-bold text-xl",
  quickSupportText: "text-[0.9rem] opacity-90",

  // Form section
  formCard: "card-premium p-10",
  successContainer: "text-center py-8",
  successIcon: "text-primary mx-auto mb-6",
  successTitle: "mb-4 text-2xl font-bold",
  successMessage: "text-text-muted mb-8",
  successButton: "btn btn-primary py-3 px-8",

  form: "flex flex-col gap-6",
  formTwoColGrid: "grid grid-cols-2 gap-4 max-sm:grid-cols-1",
  inputGroup: "",
  label: "block mb-2 font-semibold text-[0.9rem] items-center",
  input: "w-full p-3 rounded-xl border border-[#e2e8f0] outline-none transition-colors focus:border-primary",
  textarea: "resize-none",
  errorMessage: "text-red-600 text-[0.875rem] p-3 bg-red-50 rounded-lg",
  submitButton: "btn btn-primary w-full p-4 rounded-xl font-bold text-base mt-4",
};




export const landingPageStyles = {
  // Layout
  bgMain: "bg-bg-main",
  container: "container ",

  // Hero section
  heroSection:
    "fade-in items-center justify-center  hero-section pt-32 pb-16 xl:px-40 md:px-20 flex items-center gap-16 overflow-hidden md:flex-col lg:flex-col xl:flex-row max-lg:flex-col max-lg:text-center max-lg:pt-28 max-lg:pb-8 max-lg:px-4 max-lg:gap-8",
  heroContent:
    "hero-content flex-1 max-lg:flex max-lg:flex-col max-lg:items-center",
  badge: "badge bg-primary-light text-primary-dark mb-6 inline-block",
  heroTitle:
    "hero-title text-[clamp(2rem,5vw,4.5rem)] mb-6 transition-all duration-300 max-lg:text-[clamp(1.75rem,8vw,2.5rem)] max-lg:leading-tight max-lg:text-center",
  textGradient: "text-gradient",
  heroSubtitle:
    "hero-subtitle text-[1.125rem] text-text-muted mb-12 max-w-[540px] max-lg:text-base max-lg:mb-10 max-lg:mx-auto max-lg:text-center max-lg:px-4",

  // Search form
  searchForm:
    "glass search-form p-5 rounded-[2rem] flex items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)] max-w-[900px] border border-white/50 relative z-10 max-lg:flex-col max-lg:w-full max-lg:max-w-[500px] max-lg:mx-auto max-lg:gap-2 max-lg:rounded-[1.5rem]",
  searchField:
    "search-field flex-[1.2] flex items-center gap-3 py-2 px-3 transition-all duration-300 min-w-[220px] max-lg:w-full max-lg:py-4 max-lg:px-2 max-lg:border-b max-lg:border-[#f1f5f9]",
  textPrimary: "text-primary",
  flexCol: "flex flex-col flex-1",
  labelSmall:
    "text-[0.7rem] font-extrabold text-text-muted uppercase tracking-[0.05em] mb-1",
  inputTransparent:
    "border-none bg-transparent outline-none w-full text-base font-semibold text-text-main",
  searchDivider:
    "search-divider w-[1px] h-[44px] bg-border-color opacity-60 shrink-0 max-lg:hidden",
  searchButton:
    "btn btn-primary search-button h-[64px] min-w-[140px] rounded-[1.25rem] text-base font-bold shadow-[0_12px_24px_rgba(13,148,136,0.25)] flex items-center justify-center gap-2 max-lg:w-full max-lg:h-[56px] max-lg:rounded-2xl max-lg:mt-2",

  // Stats
  statsContainer:
    "stats-container flex gap-[clamp(1rem,3vw,4rem)] mt-16 max-lg:justify-center max-lg:gap-8 max-md:flex-wrap",
  statItemFlex: "flex-1 max-md:flex-none max-md:shrink-0 max-md:basis-[120px]",
  statNumber: "text-[clamp(1.5rem,3vw,2rem)] font-extrabold",
  statLabel:
    "uppercase text-[0.7rem] text-text-muted font-extrabold tracking-[0.05em]",
  statItemBorder:
    "stat-item border-l border-border-color pl-[clamp(1rem,3vw,4rem)] flex-1 max-lg:pl-8 max-md:border-none max-md:pl-0 max-md:flex-none max-md:shrink-0 max-md:basis-[120px]",

  // Hero image
  heroImageContainer: "hero-image-container flex-1 relative ",
  imageWrapper:
    "rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] relative",
  heroImage: "w-full h-[600px] object-cover",
  verifiedBadge:
    "glass absolute bottom-8 left-8 p-6 rounded-3xl flex items-center gap-4 max-w-[300px]",
  badgeIconWrapper: "bg-primary-light p-3 rounded-2xl",
  badgeTitle: "text-[0.9375rem] m-0 font-bold",
  badgeText: "text-[0.75rem] text-text-muted m-0",
  preApproved: "badge bg-primary/10 text-primary text-[0.625rem]",

  // Category section
  categorySection: "py-24 bg-bg-alt",
  categoryHeader:
    "category-header flex justify-between items-end mb-12 max-sm:flex-col max-sm:items-start max-sm:gap-6",
  categoryHeaderText: "max-w-[500px]",
  categoryTitle: "text-[2.5rem] font-extrabold mb-4 max-sm:text-[2rem]",
  categoryDesc: "text-text-muted",
  categoryGrid:
    "category-grid grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 max-sm:grid-cols-2 max-sm:gap-4",
  categoryCard:
    "category-card py-10 px-6 text-center cursor-pointer bg-white rounded-3xl border border-[#e2e8f0] transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:border-primary hover:shadow-[0_12px_25px_-5px_rgba(13,148,136,0.1)] group max-sm:py-6 max-sm:px-4",
  categoryIconWrapper:
    "category-icon-wrapper w-16 h-16 bg-primary-light text-primary rounded-[1.25rem] flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 max-sm:w-12 max-sm:h-12 max-sm:mb-4 max-sm:rounded-2xl",
  categoryName: "mb-2 text-xl font-bold max-sm:text-base",
  categoryCount: "text-text-muted text-[0.875rem]",

  // Features section
  featuresSection: "py-32",
  featuresContainer:
    "container features-container flex gap-24 items-center max-lg:flex-col max-lg:gap-12",
  featuresList:
    "features-list-container flex-1 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 max-md:grid-cols-1 max-md:gap-8",
  featureCard:
    "fade-in feature-card-item p-8 bg-white rounded-3xl border border-[#e2e8f0] transition-all duration-300 flex flex-col items-start hover:border-primary hover:-translate-y-[5px] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)]",
  featureIconWrapper:
    "w-14 h-14 bg-primary-light text-primary rounded-2xl flex items-center justify-center mb-6",
  featureTitle: "text-[1.125rem] mb-3 font-extrabold",
  featureDesc: "text-text-muted text-[0.875rem] leading-relaxed",
  featuresContent: "flex-1",
  featuresHeading: "text-[clamp(2rem,4vw,3.5rem)] font-extrabold mb-8",
  featuresSubtext: "text-text-muted text-[1.125rem] mb-12 leading-[1.8]",
  featuresListItems: "flex flex-col gap-6",
  listItem: "flex items-center gap-4 font-medium",
  learnMoreLink:
    "inline-block mt-12 text-primary font-semibold border-b-2 hover:text-primary-dark",

  // How It Works section
  processSection: "py-32 bg-bg-main",
  processHeader: "text-center mb-20",
  processBadge: "badge bg-primary/10 text-primary mb-4 inline-block",
  processTitle: "text-5xl mb-6 max-sm:text-4xl text-text-main font-extrabold",
  processSubtitle: "text-text-muted max-w-[600px] mx-auto text-lg",
  processGrid:
    "process-grid grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12 relative max-md:gap-14",
  processCard:
    "process-card py-12 px-8 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/50 relative transition-all duration-300 text-center hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-primary-light",
  stepNumber:
    "absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary text-white rounded-[1.5rem] flex items-center justify-center text-2xl font-extrabold shadow-[0_8px_20px_rgba(13,148,136,0.3)]",
  processIconWrapper:
    "w-20 h-20 bg-primary-light text-primary rounded-[2rem] flex items-center justify-center mx-auto mt-4 mb-8",
  processCardTitle: "text-[1.5rem] mb-4 font-bold",
  processCardDesc: "text-text-muted leading-[1.7]",

  // Featured Collections section
  featuredSection: "py-24 bg-bg-alt",
  featuredHeader: "text-center mb-16",
  featuredBadge: "badge bg-primary-light text-primary mb-4 inline-block",
  featuredTitle: "text-5xl mb-6 max-sm:text-4xl font-extrabold text-text-main",
  featuredSubtitle: "text-text-muted max-w-[600px] mx-auto text-lg pt-1 pb-1",
  loadingContainer: "flex justify-center items-center py-20 min-h-[400px]",
  loader:
    "loader w-10 h-10 border-4 border-solid border-secondary border-t-primary rounded-full animate-spin mx-auto",
  errorContainer: "text-center py-20 text-red-500 min-h-[300px]",
  propertiesGrid:
    "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
  discoverButtonContainer: "text-center mt-20",
  discoverButton: "btn btn-primary py-4 px-12 rounded-3xl",

  // Footer
  footer: "bg-white border-t border-[#e2e8f0] pt-24 pb-0",
  footerMainGrid:
    "footer-main-grid grid grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-16 mb-16 max-lg:grid-cols-2 max-lg:gap-12 max-sm:grid-cols-1 min-[640px]:max-[1024px]:justify-items-center",
  footerBrand:
    "footer-brand-section max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center",
  brandLogo:
    "flex items-center gap-2 text-2xl font-extrabold text-primary mb-6",
  brandIcon: "bg-primary text-white py-1.5 px-2.5 rounded-xl text-base",
  brandDesc: "text-text-muted mb-8 leading-relaxed text-[0.9375rem]",
  socialIcons: "flex gap-4",
  socialIcon:
    "social-icon w-9 h-9 rounded-full bg-bg-alt flex items-center justify-center text-text-main transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white",
  footerHeading: "text-[1.125rem] font-extrabold mb-8",
  footerLinks: "flex flex-col gap-5 text-text-muted text-[0.9375rem]",
  footerLink:
    "footer-link transition-colors duration-300 hover:text-primary hover:underline",
  contactInfo: "flex items-center gap-3",
  contactInfoStart: "flex items-start gap-3",
  contactIcon: "shrink-0 mt-[2px] text-xl",
  newsletterDesc: "text-text-muted text-[0.875rem] mb-6 leading-relaxed",
  newsletterInputWrapper: "relative",
  newsletterInput:
    "w-full py-4 pr-[85px] pl-5 rounded-2xl border border-[#e2e8f0] bg-bg-alt outline-none text-[0.875rem] focus:border-primary transition-colors",
  newsletterButton:
    "btn btn-primary absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-xl text-[0.8125rem]",
  bottomBar:
    "border-t border-[#e2e8f0] py-8 flex flex-col gap-4 text-[0.875rem] text-text-muted",
  bottomBarFlex:
    "flex justify-between items-center flex-wrap gap-4 max-sm:flex-col-reverse max-sm:justify-center",
  footerLegalLinks:
    "flex gap-8 max-sm:w-full max-sm:justify-center max-sm:flex-wrap max-sm:gap-4",
  designCredit: "flex justify-center items-center gap-2 pt-2",
  designLogo: "w-5 h-5 object-contain",
  designLink:
    "font-semibold text-primary hover:text-blue-700 hover:underline transition-colors duration-300",
};

export const forgotPasswordStyles = {
  container: "bg-bg-alt min-h-screen pt-32 max-lg:pt-28",
  centerWrapper: "container flex justify-center items-center pt-16 sm:pt-8",
  formCard: "glass fade-in w-full max-w-[450px] p-10 sm:p-6 rounded-3xl sm:rounded-2xl shadow-card",
  title: "text-[2rem] sm:text-2xl font-bold text-center mb-2 text-primary",
  subtitle: "text-center text-text-muted mb-8",
  errorMessage: "p-3 bg-red-100 text-red-600 rounded-lg mb-4 text-sm text-center",
  successMessage: "p-3 bg-green-100 text-green-600 rounded-lg mb-4 text-sm text-center",
  form: "flex flex-col gap-5",
  label: "block mb-2 font-medium",
  input: "w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors",
  submitButton: "btn btn-primary p-3.5 text-base mt-2",
  footerText: "text-center mt-8 text-text-muted",
  link: "text-primary font-semibold hover:underline",
};

export const loginStyles = {
  pageContainer: "bg-bg-alt min-h-screen pt-32 max-lg:pt-28",
  containerCenter: "container flex justify-center items-center pt-16 sm:pt-8",
  card: "glass fade-in w-full max-w-[450px] p-10 sm:p-6 rounded-3xl sm:rounded-2xl shadow-card",
  title: "text-[2rem] sm:text-2xl font-bold text-center mb-2 text-primary",
  subtitle: "text-center text-text-muted mb-8",
  errorAlert: "p-3 bg-red-100 text-red-600 rounded-lg mb-4 text-sm text-center",
  form: "flex flex-col gap-5",
  label: "block mb-2 font-medium",
  input: "w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors",
  passwordHeader: "flex justify-between items-center mb-2",
  forgotLink: "text-sm text-primary font-medium hover:underline",
  submitButton: "btn btn-primary p-3.5 text-base mt-2",
  footerText: "text-center mt-8 text-text-muted",
  registerLink: "text-primary font-semibold hover:underline",
};


export const resetPasswordStyles = {
  container: "bg-bg-alt min-h-screen pt-32 max-lg:pt-28",
  centerWrapper: "container flex justify-center items-center pt-16 sm:pt-8",
  formCard: "glass fade-in w-full max-w-[450px] p-10 sm:p-6 rounded-3xl sm:rounded-2xl shadow-card",
  title: "text-[2rem] sm:text-2xl font-bold text-center mb-2 text-primary",
  subtitle: "text-center text-text-muted mb-8",
  errorMessage: "p-3 bg-red-100 text-red-600 rounded-lg mb-4 text-sm text-center",
  successMessage: "p-3 bg-green-100 text-green-600 rounded-lg mb-4 text-sm text-center",
  form: "flex flex-col gap-5",
  label: "block mb-2 font-medium",
  input: "w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors",
  submitButton: "btn btn-primary p-3.5 text-base mt-2",
  footerText: "text-center mt-8 text-text-muted",
  link: "text-primary font-semibold hover:underline",
};

export const registerStyles = {
  // Layout
  pageWrapper: "bg-bg-alt min-h-screen pt-32 max-lg:pt-28",
  container: "container flex justify-center items-center pt-8 pb-16 sm:pt-4 sm:pb-8",

  // Form card
  formCard: "glass fade-in w-full max-w-[500px] p-10 sm:p-6 rounded-3xl sm:rounded-2xl shadow-card",
  heading: "text-[2rem] sm:text-2xl font-bold text-center mb-2 text-primary",
  subheading: "text-center text-text-muted mb-8",

  // Messages
  errorMessage: "p-3 bg-red-100 text-red-600 rounded-lg mb-4 text-sm text-center",
  successMessage: "p-3 bg-green-100 text-green-600 rounded-lg mb-4 text-sm text-center",

  // Form
  form: "flex flex-col gap-5 sm:gap-4",
  label: "block mb-2 font-medium",
  input: "w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors",

  // Role selection
  roleContainer: "flex gap-4",
  roleLabelBase: "flex-1 cursor-pointer p-3 rounded-lg border-2 text-center transition-all duration-200",
  roleLabelActive: "border-primary bg-secondary",
  roleLabelInactive: "border-border bg-white",
  hiddenRadio: "hidden",

  // Submit button
  submitButton: "btn btn-primary p-3.5 text-base mt-2",

  // Footer
  footerText: "text-center mt-8 text-text-muted",
  loginLink: "text-primary font-semibold hover:underline",
};

export const verifyEmailStyles = {
  pageContainer: "bg-bg-alt min-h-screen pt-32 max-lg:pt-28",
  containerCenter: "container flex justify-center items-center pt-16 sm:pt-8",
  card: "glass fade-in w-full max-w-[450px] p-10 sm:p-6 rounded-3xl sm:rounded-2xl shadow-card",
  title: "text-[2rem] sm:text-2xl font-bold text-center mb-2 text-primary",
  subtitle: "text-center text-text-muted mb-8",
  errorAlert: "p-3 bg-red-100 text-red-600 rounded-lg mb-4 text-sm text-center",
  successAlert: "p-3 bg-green-100 text-green-600 rounded-lg mb-4 text-sm text-center",
  form: "flex flex-col gap-5",
  label: "block mb-2 font-medium",
  input: "w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors",
  codeInput: "w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors text-center text-2xl tracking-[0.5em]",
  submitButton: "btn btn-primary p-3.5 text-base mt-2",
};

export const adminLayoutStyles = {
  layout: "flex h-screen bg-bg-alt overflow-hidden",
  mainWrapper: "flex-1 flex flex-col min-w-0 h-full overflow-hidden transition-all duration-300 md:ml-[260px]",
  mainContent: "flex-1 overflow-y-auto p-5 md:p-8 relative scroll-smooth fade-in",
};

export const adminSidebarStyles = {
  backdrop: (isOpen) => `fixed inset-0 w-full h-full bg-black/30 backdrop-blur-sm z-[950] transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible hidden md:block'
    }`,
  sidebar: (isOpen) => `fixed left-0 top-0 w-[260px] h-screen bg-white border-r border-[#f1f5f9] py-8 px-5 flex flex-col z-[1000] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`,
  logoContainer: "px-3 mb-10 flex justify-between items-center",
  navContainer: "flex flex-col gap-1.5 flex-1",
  navLink: (isActive) => `flex items-center gap-4 py-3.5 px-4 rounded-xl no-underline text-[0.9375rem] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive
    ? 'font-bold text-primary bg-primary-light'
    : 'font-medium text-[#64748b] hover:bg-gray-50'
    }`,
  logoutContainer: "border-t border-[#f1f5f9] pt-6 mt-auto",
  logoutButton: "w-full flex items-center gap-4 py-3.5 px-4 rounded-xl border-none bg-transparent text-[0.9375rem] font-semibold text-[#dc2626] cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-red-50",
};

