import { Link } from 'react-router-dom';

export default function Legal() {
  return (
    <div className="min-h-screen py-12 px-6 bg-[#051923] text-[#F5F9FC]">
      <div className="max-w-4xl mx-auto prose prose-invert">
        <h1>Mentions légales</h1>
        <p>Bienvenue sur GRANDLINE. Cette page contient les informations légales du site.</p>

        <h2 id="privacy">Politique de confidentialité</h2>
        <p>
          Nous respectons votre vie privée. Les données collectées sont utilisées uniquement
          pour le fonctionnement du site et ne sont pas partagées sans consentement.
        </p>

        <h2 id="terms">Conditions générales</h2>
        <p>
          Les présentes conditions régissent l'utilisation du site GRANDLINE. En utilisant le site,
          vous acceptez ces conditions.
        </p>

        <div className="mt-8">
          <Link to="/" className="text-[#4DD0E1] hover:underline">Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}
