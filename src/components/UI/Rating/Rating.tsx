import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

interface IHalfRating {
  rating: Float32Array;
}
const HalfRating = ({ rating }: IHalfRating) => {
  const [ratingValue, setRatingValue] = React.useState(rating);

  React.useEffect(() => {
    setRatingValue(rating);
  }, [rating]);
  return (
    <Stack spacing={1}>
      {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
      <Rating name="half-rating-read" value={Number(ratingValue)} precision={0.5} readOnly />
    </Stack>
  );
};

export default HalfRating;
