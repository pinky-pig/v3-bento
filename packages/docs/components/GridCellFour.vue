<template>
  <div
    class="dragItemBox"
  >
    <svg style="pointer-events: none ;transform: scale(1.5) translateY(-5px) translateX(3px);" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter
          id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"
        >
          <feMorphology operator="dilate" radius="20 20" in="SourceAlpha" result="morphology" />
          <feFlood flood-color="#ffffff" flood-opacity="1" result="flood" />
          <feComposite in="flood" in2="morphology" operator="in" result="composite" />
          <feMerge result="merge">
            <feMergeNode in="composite" result="mergeNode" />
            <feMergeNode in="SourceGraphic" result="mergeNode1" />
          </feMerge>
        </filter>
      </defs>
      <g id="notion-avatar" filter="url(#filter)">
        <g id="notion-avatar-face" fill="#ffffff"> <!-- ?xml version="1.0" encoding="UTF-8"? -->
          <title>Face/ 6</title>
          <g
            id="Face/-6" stroke="none" stroke-width="1" fill-rule="evenodd" stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              id="Path"
              d="M532,379 C664.54834,379 772,486.45166 772,619 C772,751.54834 764.54834,899 532,899 C402.610491,899 332.317998,816.086314 305.249034,718.717925 C264.225797,715.291578 232,680.909158 232,639 C232,599.134956 261.158843,566.080325 299.312086,560.00055 C325.599297,455.979213 419.809919,379 532,379 Z M295.858895,624.545187 L304.141105,655.454813" stroke="#000000" stroke-width="24"
            />
          </g>
        </g>
        <g id="notion-avatar-nose"> <!-- ?xml version="1.0" encoding="UTF-8"? -->
          <title>Nose/ 8</title>
          <g
            id="Nose/-8" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              id="Path" d="M649,600 C682.333333,613.333333 699,630 699,650 C699,670 682.333333,680 649,680"
              stroke="#000000" stroke-width="16"
            />
          </g>
        </g>
        <g id="notion-avatar-mouth"> <!-- ?xml version="1.0" encoding="UTF-8"? -->
          <title>Mouth/ 5</title>
          <g
            id="Mouth/-5" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle id="Oval" stroke="#000000" stroke-width="16" cx="621" cy="768" r="40" />
          </g>
        </g>
        <g id="notion-avatar-eyes"> <!-- ?xml version="1.0" encoding="UTF-8"? -->
          <title>Eyes/ 0</title>
          <g id="Eyes/-0" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
              id="Combined-Shape"
              d="M570,516 C583.254834,516 594,526.745166 594,540 C594,553.254834 583.254834,564 570,564 C556.745166,564 546,553.254834 546,540 C546,526.745166 556.745166,516 570,516 Z M708,516 C721.254834,516 732,526.745166 732,540 C732,553.254834 721.254834,564 708,564 C694.745166,564 684,553.254834 684,540 C684,526.745166 694.745166,516 708,516 Z" fill="#000000"
            />
          </g>
        </g>
        <g id="notion-avatar-eyebrows"> <!-- ?xml version="1.0" encoding="UTF-8"? -->
          <title>Eyebrows/ 0</title>
          <g
            id="Eyebrows/-0" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
            stroke-linejoin="round"
          >
            <g id="Group" transform="translate(525.000000, 492.000000)" stroke="#000000" stroke-width="16">
              <path
                id="Path"
                d="M0,16 C12.8888889,5.33333333 27.8888889,0 45,0 C62.1111111,0 77.1111111,5.33333333 90,16"
              />
              <path
                id="Path"
                d="M138,16 C150.888889,5.33333333 165.888889,0 183,0 C200.111111,0 215.111111,5.33333333 228,16"
              />
            </g>
          </g>
        </g>
        <g id="notion-avatar-glasses"> <!-- ?xml version="1.0" encoding="UTF-8"? -->
          <title>Glasses/ 0</title>
          <g id="Glasses/-0" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" />
        </g>
        <g id="notion-avatar-hair">
          <g id="Hairstyle/ 37">
            <path
              id="Path" fill-rule="evenodd" clip-rule="evenodd"
              d="M497.312 301.258C541.612 295.032 579.175 301.734 581.212 316.227L581.171 315.948C650.089 325.905 682.601 353.62 699 373C713.667 390.333 721 410 721 432L707.421 430.871C691.263 429.542 641.711 411.403 628.764 410.454C631.023 416.556 632.654 422.983 633.657 429.735L631.329 428.09C613.169 415.342 601.493 409.076 596.302 409.293L596.141 409.302C593.535 409.484 590.475 408.964 586.96 407.74L583.945 407.585C582.635 407.519 581.363 407.459 580.13 407.403L580.955 408.284C583.506 411.029 585.476 413.338 586.866 415.212C589.264 418.446 590.961 421.769 591.957 425.181C578.459 418.497 516 394 471 403C447.673 407.665 422.7 429.111 402.563 425.184C394.011 429.97 386.206 436.624 379.296 445.522C355.592 476.045 379 498.408 379 516L378.995 516.737C378.83 529.316 374.669 573.806 366.512 650.209L366 655L328.117 564.825H287.146C271.78 507.747 268.106 468.653 276.123 447.542C285.791 422.084 334.128 358.354 419.743 330.709C431.777 320.313 466.044 305.652 497.312 301.258Z"
              fill="black" stroke="black" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"
            />
          </g>
        </g>
        <g id="notion-avatar-accessories"> <!-- ?xml version="1.0" encoding="UTF-8"? -->
          <title>Accessories/ 0</title>
          <g id="Accessories/-0" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" />
        </g>
        <g id="notion-avatar-details"> <!-- ?xml version="1.0" encoding="UTF-8"? -->
          <title>Details/ 2</title>
          <g
            id="Details/-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              id="Combined-Shape"
              d="M485,619 C507.09139,619 525,627.954305 525,639 C525,650.045695 507.09139,659 485,659 C462.90861,659 445,650.045695 445,639 C445,627.954305 462.90861,619 485,619 Z M768.257551,619.086322 C769.489678,619.029221 768.023293,658.926198 766.096923,658.783728 C746.80451,657.35691 732,649.0429 732,639 C732,628.585298 747.920969,620.029867 768.257551,619.086322 Z" stroke="#000000" stroke-width="12"
            />
          </g>
        </g>
        <g id="notion-avatar-beard"> <!-- ?xml version="1.0" encoding="UTF-8"? -->
          <title>Beard/ 0</title>
          <g id="Beard/-0" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style>
.dragItemBox{
  font-size: 1.25rem;
  line-height: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  border:3px solid black;
  border-radius: 0.375rem;
}
</style>
