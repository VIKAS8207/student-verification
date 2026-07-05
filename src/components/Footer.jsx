export default function Footer() {
  return (
    <footer className="mt-20 py-8 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-sm text-textMuted font-medium">© 2026 CGPURC Academic Registry. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="text-sm font-bold text-primary hover:underline">Privacy Policy</a>
          <a href="#" className="text-sm font-bold text-primary hover:underline">Terms of Service</a>
          <a href="#" className="text-sm font-bold text-primary hover:underline">Support</a>
        </div>
      </div>
    </footer>
  );
}