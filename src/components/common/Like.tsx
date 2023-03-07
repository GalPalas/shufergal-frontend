import HeartIconSolid from "assets/icons/HeartIconSolid";
import HeartIconOutline from "assets/icons/HeartIconOutline";

type LikeProps = {
  liked: boolean;
  onLikeToggle: () => void;
};

export const Like = ({ liked, onLikeToggle }: LikeProps) => {
  return liked ? (
    <HeartIconSolid onLikeToggle={onLikeToggle} />
  ) : (
    <HeartIconOutline onLikeToggle={onLikeToggle} />
  );
};
