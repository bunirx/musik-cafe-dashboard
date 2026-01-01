import { SOCIAL_LINKS } from '@/config';

export default function Footer() {
  return (
    <footer className="bg-darker-blue/80 backdrop-blur-md border-t border-aqua/20 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-400">
            Musik Cafe Dashboard &copy; 2026 | Made with ❤️ by Bunirx
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* Discord Link */}
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-300"
            title="Join Discord Server"
          >
            <svg
              className="w-6 h-6 text-aqua hover:text-white transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.028C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.08.08 0 00.087-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.294.075.075 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 01.079.009c.12.098.246.198.373.295a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.076.076 0 00-.041.107c.36.699.772 1.365 1.225 1.994a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.057c.5-4.761-.838-8.901-3.549-12.576a.06.06 0 00-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.948-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.948 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.948-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.948 2.418-2.157 2.418z" />
            </svg>
          </a>

          {/* YouTube Link */}
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-300"
            title="Subscribe on YouTube"
          >
            <svg
              className="w-6 h-6 text-aqua hover:text-red-500 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
