import { Vector3Tuple } from 'three';

const mapData: {
  npc: string;
  position: Vector3Tuple;
  text: string[];
}[] = [
  {
    npc: "wario",
    position: [8, 0, -5],
    text: ["흠, 넌 뭐지?", "뭐... 잘 모르겠지만, 개발자구만?", "개발자라면 날 좀 도와줘야겠어."],
  },
];

export default mapData;