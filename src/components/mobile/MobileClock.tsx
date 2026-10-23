import dayjs from "dayjs";
import { useState, useEffect } from "react";

const MobileClock = () => {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(dayjs());
    }, 1000 * 15);
    return () => {
      clearInterval(id);
    };
  }, []);

  return <time dateTime={now.toISOString()}>{now.format("h:mm A")}</time>;
};

export default MobileClock;
