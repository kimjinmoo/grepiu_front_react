// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
export const toolbarOptions =
    [
      [{ 'font': [] }],
      ["link", "image", "video"],
      [
        {header: [1, 2, 3, false]}
      ],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{list: "ordered"}, {list: "bullet"}],
      [{color: []}, {background: []}], [{align: []}],
    ];

// 지원시 툴바
export const supportToolbarOptions =
    [
      [{ 'font': [] }],
      [
        {header: [1, 2, 3, false]}
      ],
      [{color: []}, {background: []}], [{align: []}],
    ];

// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
export const formats =
    [
      "header", "font", "size", "bold", "italic", "underline",
      "strike", "align", "blockquote", "list", "bullet", "indent", "background",
      "color", "link", "image", "video","code-block", "script"
    ];

export const modules = {toolbar: {container: toolbarOptions,},};

export const supportModules = {toolbar: {container: supportToolbarOptions,},};

export default {
  toolbarOptions,
      formats,
      modules
}
