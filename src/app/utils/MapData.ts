import { Vector3Tuple } from "three";

const mapData: {
  npc: string;
  position: Vector3Tuple;
  text: string[];
  text2: string[];
  text3: string[];
}[] = [
  {
    npc: "wario",
    position: [8, 0, -5],
    text: ["흠, 넌 뭐지?", "뭐... 잘 모르겠지만, 개발자구만?", "개발자라면 날 좀 도와줘야겠어."],
    text2: ["자, 오른쪽 하단의 박스 이미지가 보이지?", "시안 처럼 박스 위치를 변경하여 구현해줘~", "단! 1px도 틀리면 안돼"],
    text3: ["수고 했어!", "아, 참 내 소개가 늦었네.", "나는 디자이너 '와리오'라고 해~", "앞으로도 너에게 이러한 부탁을 하는 사람이 많을거야!", "앞으로도 잘 부탁한다고!"]
  },
];

export default mapData;