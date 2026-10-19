import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import { WindowControls, WindowFrame } from "@/components/window";
import { blogPosts } from "@/constant";

const Safari = () => {
  return (
    <WindowFrame windowKey="safari">
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

      <div className="blog">
        <h2>My Developer Blog</h2>

        <div className="space-y-8">
          {blogPosts.map(({ id, image, title, date }) => (
            <div key={id} className="blog-post">
              <div className="col-span-2">
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
    </WindowFrame>
  );
};

export default Safari;
