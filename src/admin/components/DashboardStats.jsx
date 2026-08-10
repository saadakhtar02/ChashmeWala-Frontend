import React, { useState } from 'react';
import { FiBox, FiArchive, FiAlertCircle, FiLayers, FiPieChart, FiBarChart2, FiTrendingUp } from 'react-icons/fi';

function PieChart({ data, totalLabel }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-xs font-semibold text-gray-400">
        No product data available
      </div>
    );
  }

  let accumulatedAngle = 0;
  const slices = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    accumulatedAngle += angle;

    const radStart = (startAngle - 90) * (Math.PI / 180);
    const radEnd = (endAngle - 90) * (Math.PI / 180);

    const rOuter = 82;
    const rInner = 54;
    const cx = 100;
    const cy = 100;

    const x1 = cx + rOuter * Math.cos(radStart);
    const y1 = cy + rOuter * Math.sin(radStart);
    const x2 = cx + rOuter * Math.cos(radEnd);
    const y2 = cy + rOuter * Math.sin(radEnd);

    const x3 = cx + rInner * Math.cos(radEnd);
    const y3 = cy + rInner * Math.sin(radEnd);
    const x4 = cx + rInner * Math.cos(radStart);
    const y4 = cy + rInner * Math.sin(radStart);

    const largeArc = angle > 180 ? 1 : 0;
    const isFull = angle >= 359.9;

    const pathData = isFull
      ? `M ${cx} ${cy - rOuter} A ${rOuter} ${rOuter} 0 1 1 ${cx - 0.001} ${cy - rOuter} L ${cx - 0.001} ${cy - rInner} A ${rInner} ${rInner} 0 1 0 ${cx} ${cy - rInner} Z`
      : `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    const percentage = Math.round((item.value / total) * 100);

    return {
      ...item,
      pathData,
      percentage,
      index
    };
  });

  const activeSlice = hoveredIndex !== null ? slices[hoveredIndex] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90 overflow-visible drop-shadow-sm">
          {slices.map((slice) => {
            const isHovered = hoveredIndex === slice.index;
            return (
              <path
                key={slice.index}
                d={slice.pathData}
                fill={slice.color}
                onMouseEnter={() => setHoveredIndex(slice.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="transition-all duration-200 cursor-pointer stroke-white stroke-2"
                style={{
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                  transformOrigin: '100px 100px',
                  opacity: hoveredIndex !== null && !isHovered ? 0.6 : 1
                }}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-2">
          {activeSlice ? (
            <>
              <span className="text-2xl font-black font-outfit text-gray-900 leading-none">
                {activeSlice.value}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">
                {activeSlice.label}
              </span>
              <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1 border border-amber-200/50">
                {activeSlice.percentage}%
              </span>
            </>
          ) : (
            <>
              <span className="text-3xl font-black font-outfit text-gray-900 leading-none">
                {total}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1 font-sans">
                {totalLabel || 'Total Items'}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 w-full font-sans">
        {slices.map((slice) => {
          const isHovered = hoveredIndex === slice.index;
          return (
            <div
              key={slice.index}
              onMouseEnter={() => setHoveredIndex(slice.index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer border ${
                isHovered
                  ? 'bg-gray-50 border-gold/30 shadow-sm'
                  : 'bg-gray-50/40 border-gray-100 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-xs font-semibold text-gray-700">
                  {slice.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900 font-outfit">
                  {slice.value}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 bg-white px-2 py-0.5 rounded-md border border-gray-200/60">
                  {slice.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BarChart({ data }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-4 font-sans">
      {data.map((item, idx) => {
        const percentage = Math.round((item.value / maxValue) * 100);
        return (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-700 font-sans">{item.label}</span>
              <span className="text-gray-900 font-bold font-outfit">{item.displayValue || item.value}</span>
            </div>
            <div className="w-full h-3.5 bg-gray-100/80 rounded-full overflow-hidden p-0.5 border border-gray-200/50">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{
                  width: `${Math.max(percentage, 4)}%`,
                  backgroundColor: item.color || '#C59135'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DashboardStats({ products }) {
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStockCount = products.filter((p) => p.stock <= 10 && p.stock > 0).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const menCount = products.filter((p) => p.category === 'Men').length;
  const womenCount = products.filter((p) => p.category === 'Women').length;
  const kidsCount = products.filter((p) => p.category === 'Kids').length;
  const otherCatCount = totalProducts - (menCount + womenCount + kidsCount);

  // Dynamic Pie Chart 1: Categories
  const categoryPieData = [
    { label: 'Men Eyewear', value: menCount, color: '#C59135' },
    { label: 'Women Eyewear', value: womenCount, color: '#3B82F6' },
    { label: 'Kids Eyewear', value: kidsCount, color: '#8B5CF6' }
  ];
  if (otherCatCount > 0) {
    categoryPieData.push({ label: 'Other', value: otherCatCount, color: '#10B981' });
  }

  // Dynamic Pie Chart 2: Stock Status
  const inStockCount = products.filter((p) => p.stock > 10).length;
  const stockPieData = [
    { label: 'In Stock (>10)', value: inStockCount, color: '#10B981' },
    { label: 'Low Stock (1-10)', value: lowStockCount, color: '#F59E0B' },
    { label: 'Sold Out (0)', value: outOfStockCount, color: '#EF4444' }
  ];

  // Dynamic Bar Graph 1: Price Brackets
  const priceBrackets = [
    { label: 'Under ₹500', value: products.filter((p) => p.finalPrice < 500).length, color: '#10B981' },
    { label: '₹500 - ₹1,200', value: products.filter((p) => p.finalPrice >= 500 && p.finalPrice < 1200).length, color: '#3B82F6' },
    { label: '₹1,200 - ₹2,500', value: products.filter((p) => p.finalPrice >= 1200 && p.finalPrice <= 2500).length, color: '#8B5CF6' },
    { label: 'Above ₹2,500', value: products.filter((p) => p.finalPrice > 2500).length, color: '#C59135' }
  ];

  // Dynamic Bar Graph 2: Stock Units per Category
  const menStock = products.filter((p) => p.category === 'Men').reduce((acc, p) => acc + (p.stock || 0), 0);
  const womenStock = products.filter((p) => p.category === 'Women').reduce((acc, p) => acc + (p.stock || 0), 0);
  const kidsStock = products.filter((p) => p.category === 'Kids').reduce((acc, p) => acc + (p.stock || 0), 0);

  const categoryStockData = [
    { label: 'Men Eyewear', value: menStock, displayValue: `${menStock} units`, color: '#C59135' },
    { label: 'Women Eyewear', value: womenStock, displayValue: `${womenStock} units`, color: '#3B82F6' },
    { label: 'Kids Eyewear', value: kidsStock, displayValue: `${kidsStock} units`, color: '#8B5CF6' }
  ];

  const statCards = [
    {
      title: "Total Catalog Styles",
      value: totalProducts,
      icon: <FiBox className="w-5 h-5 text-amber-600" />,
      badge: "Showcase Catalog",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
      desc: "Unique optical frame designs"
    },
    {
      title: "Total Inventory Units",
      value: totalStock,
      icon: <FiArchive className="w-5 h-5 text-blue-600" />,
      badge: "Aggregate Stock",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200/60",
      desc: "Units across all product lines"
    },
    {
      title: "Stock Alert Status",
      value: lowStockCount + outOfStockCount,
      icon: <FiAlertCircle className="w-5 h-5 text-red-600" />,
      badge: outOfStockCount > 0 ? `${outOfStockCount} Sold Out` : "Healthy",
      badgeColor: outOfStockCount > 0 ? "bg-red-50 text-red-700 border-red-200/60" : "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      desc: `${lowStockCount} items low, ${outOfStockCount} out of stock`
    },
    {
      title: "Product Categories",
      value: "3 Lines",
      icon: <FiLayers className="w-5 h-5 text-purple-600" />,
      badge: "Target Audience",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200/60",
      desc: `Men (${menCount}) • Women (${womenCount}) • Kids (${kidsCount})`
    }
  ];

  return (
    <div className="space-y-8 font-sans">
      <div className="text-left">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold inline-block" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-gold font-outfit">
            Catalog Overview
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl text-gray-900 mt-1">
          Product Showcase Analytics
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-sans">
          Real-time catalog metrics and inventory breakdown calculated directly from product items.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200/80 p-6 rounded-2xl flex flex-col justify-between hover:border-gold/40 hover:shadow-md transition-all duration-300 relative text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-150 flex items-center justify-center shadow-inner">
                  {stat.icon}
                </div>
              </div>

              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
                {stat.title}
              </p>

              <h3 className="font-outfit font-black text-3xl text-gray-900 mt-1">
                {stat.value}
              </h3>
            </div>

            <p className="text-xs text-gray-400 border-t border-gray-100 pt-3 mt-4 font-sans">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Dynamic Pie Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-50 text-gold border border-amber-200/60">
                <FiPieChart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-outfit font-extrabold text-base text-gray-900">
                  Category Distribution
                </h3>
                <p className="text-[11px] text-gray-400 font-sans">Breakdown of products by demographic line</p>
              </div>
            </div>
          </div>
          <PieChart data={categoryPieData} totalLabel="Total Styles" />
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                <FiPieChart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-outfit font-extrabold text-base text-gray-900">
                  Stock Health Profile
                </h3>
                <p className="text-[11px] text-gray-400 font-sans">Inventory availability status distribution</p>
              </div>
            </div>
          </div>
          <PieChart data={stockPieData} totalLabel="Total Catalog" />
        </div>
      </div>

      {/* Dynamic Bar Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
                <FiBarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-outfit font-extrabold text-base text-gray-900">
                  Price Tier Range
                </h3>
                <p className="text-[11px] text-gray-400 font-sans">Catalog item counts across price brackets</p>
              </div>
            </div>
          </div>
          <BarChart data={priceBrackets} />
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-200/60">
                <FiBarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-outfit font-extrabold text-base text-gray-900">
                  Inventory Units by Category
                </h3>
                <p className="text-[11px] text-gray-400 font-sans">Aggregate stock volume per eyewear category</p>
              </div>
            </div>
          </div>
          <BarChart data={categoryStockData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
