import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mic,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import { WindowControls, WindowFrame } from "@/components/window";
import { blogPosts } from "@/constant";
import { MobileWindowControls } from "@/components/mobile";
import { useMediaQuery } from "react-responsive";

const Safari = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 639px)" });
  return (
    <WindowFrame windowKey="safari">
      {/* Desktop Header */}
      <div id="window-header">
        <WindowControls windowId="safari" />
        <PanelLeft className="icon ml-10" />

        <div className="ml-5 flex items-center gap-1">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-center flex-1 gap-3">
          <ShieldHalf className="icon" />
          <div className="search">
            <Search className="icon" />
            <input
              placeholder="Search or enter website name"
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      {/* Mobile Header */}
      <div
        id="window-window-header"
        className="relative z-10 flex items-center justify-between gap-5 px-3 pb-3 sm:hidden"
      >
        <MobileWindowControls windowId="safari" />
        <p className="font-georama line-clamp-1 flex-[1.5] text-lg text-black dark:text-white">
          Safari
        </p>
      </div>

      <div className="blog">
        <h2>My Developer Blog</h2>

        <div className="space-y-8">
          {blogPosts.map(({ id, image, title, date }) => (
            <div key={id} className="blog-post">
              <div className="col-span-3 sm:col-span-2">
                <img src={image} alt={title} />
              </div>
              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <p className="url">
                  Check out the full post
                  <MoveRight className="icon-hover" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isMobile && (
        <footer>
          <div className="search">
            <Search className="icon" />
            <input
              placeholder="Search or enter website name"
              className="flex-1"
              type="text"
            />
            <Mic className="icon" />
          </div>
          <div>
            <ChevronLeft className="icon text-muted-foreground" />

            <ChevronRight className="text-muted-foreground" />
            <Share className="icon text-blue-600" />

            <BookOpen className="icon text-blue-600" />

            <Copy className="icon text-blue-600" />
          </div>
        </footer>
      )}
    </WindowFrame>
  );
};

export default Safari;
