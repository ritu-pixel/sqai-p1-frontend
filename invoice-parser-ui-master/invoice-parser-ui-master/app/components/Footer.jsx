'use client';

export default function Footer() {
  return (
    <footer className="bg-transparent text-gray-400 text-center py-6 mt-auto text-sm">
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://www.linkedin.com/company/quality-ai-io/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-700 hover:text-blue-300"
        >
          Sentienta QualityAI
        </a>{' '}
        Project.
      </p>
    </footer>
  );
}
