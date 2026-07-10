import type { BodyMapRegion } from "@/lib/types";

export type Marker3D = [number, number, number];

export interface RegionMeta {
  label: string;
  subtitle: string;
  side: string;
  regionGroup: string;
  initialAzimuth: number;
  marker: Marker3D;
  markerTop: string;
  markerLeft: string;
}

export const regionMeta: Record<BodyMapRegion, RegionMeta> = {
  head: {
    label: "Head",
    subtitle: "Head & neck · Cranial region",
    side: "Center",
    regionGroup: "Head & neck",
    initialAzimuth: 0,
    marker: [0, 1.72, 0.1],
    markerTop: "8%",
    markerLeft: "50%",
  },
  chest: {
    label: "Chest",
    subtitle: "Torso · Chest region",
    side: "Center",
    regionGroup: "Torso",
    initialAzimuth: 0,
    marker: [0, 1.34, 0.14],
    markerTop: "28%",
    markerLeft: "50%",
  },
  back: {
    label: "Upper Back",
    subtitle: "Torso · Dorsal region",
    side: "Center",
    regionGroup: "Torso",
    initialAzimuth: Math.PI,
    marker: [0, 1.34, -0.14],
    markerTop: "28%",
    markerLeft: "50%",
  },
  left_shoulder: {
    label: "Left Shoulder",
    subtitle: "Upper limb · Shoulder region",
    side: "Left",
    regionGroup: "Upper limb",
    initialAzimuth: Math.PI,
    marker: [-0.2, 1.48, -0.1],
    markerTop: "22%",
    markerLeft: "22%",
  },
  right_shoulder: {
    label: "Right Shoulder",
    subtitle: "Upper limb · Shoulder region",
    side: "Right",
    regionGroup: "Upper limb",
    initialAzimuth: Math.PI,
    marker: [0.2, 1.48, -0.1],
    markerTop: "22%",
    markerLeft: "78%",
  },
  left_forearm: {
    label: "Left Forearm",
    subtitle: "Upper limb · Forearm region",
    side: "Left",
    regionGroup: "Upper limb",
    initialAzimuth: 0,
    marker: [-0.34, 1.12, 0.1],
    markerTop: "38%",
    markerLeft: "12%",
  },
  right_forearm: {
    label: "Right Forearm",
    subtitle: "Upper limb · Forearm region",
    side: "Right",
    regionGroup: "Upper limb",
    initialAzimuth: 0,
    marker: [0.34, 1.12, 0.1],
    markerTop: "38%",
    markerLeft: "88%",
  },
  abdomen: {
    label: "Abdomen",
    subtitle: "Torso · Abdominal region",
    side: "Center",
    regionGroup: "Torso",
    initialAzimuth: 0,
    marker: [0, 1.14, 0.13],
    markerTop: "42%",
    markerLeft: "50%",
  },
  left_thigh: {
    label: "Left Thigh",
    subtitle: "Lower limb · Thigh region",
    side: "Left",
    regionGroup: "Lower limb",
    initialAzimuth: 0,
    marker: [-0.1, 0.72, 0.1],
    markerTop: "58%",
    markerLeft: "38%",
  },
  right_thigh: {
    label: "Right Thigh",
    subtitle: "Lower limb · Thigh region",
    side: "Right",
    regionGroup: "Lower limb",
    initialAzimuth: 0,
    marker: [0.1, 0.72, 0.1],
    markerTop: "58%",
    markerLeft: "62%",
  },
};
