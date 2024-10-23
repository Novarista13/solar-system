import { useThree } from "@react-three/fiber";
import { useCallback } from "react";

// cameraTarget.y += planetRadius * -0.5;
// cameraTarget.z -= planetRadius * 0;

export const useResponsiveX = () => {
  const size = useThree((state) => state.size);

  const responsiveX = useCallback(
    (y, z, cameraDistanceFactor) => {
      const aspectRatio = size.width / size.height;

      if (aspectRatio < 1) {
        cameraDistanceFactor.current = 4;
        y.current = -0.5;
        z.current = 0;
        return 0;
      } else {
        const aspectRatioFactor = Math.min(size.width / window.innerWidth, 1);
        z.current = z.current * aspectRatioFactor * 0.6;
      }
    },
    [size.width]
  );

  return responsiveX;
};
