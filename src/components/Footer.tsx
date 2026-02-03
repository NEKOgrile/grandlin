import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black/10 text-[#F5F9FC] py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">© {new Date().getFullYear()} GRANDLINE</div>
        <div className="flex gap-4 text-sm">
          <Link to="/legal" className="hover:underline">Mentions légales</Link>
          <Link to="/legal#privacy" className="hover:underline">Politique de confidentialité</Link>
          <Link to="/legal#terms" className="hover:underline">Conditions générales</Link>
        </div>
      </div>
    </footer>
  );
}
