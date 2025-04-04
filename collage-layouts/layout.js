const layoutLibrary = [
    {
        name: "Classic Grid (2x2)",
        id: "grid2x2",
        aspectRatio: "1:1",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 50 },
            { id: 1, x: 50, y: 0, width: 50, height: 50 },
            { id: 2, x: 0, y: 50, width: 50, height: 50 },
            { id: 3, x: 50, y: 50, width: 50, height: 50 }
        ]
    },
    {
        name: "Classic Grid (3x3)",
        id: "grid3x3",
        aspectRatio: "1:1",
        cells: [
            { id: 0, x: 0, y: 0, width: 33.33, height: 33.33 },
            { id: 1, x: 33.33, y: 0, width: 33.33, height: 33.33 },
            { id: 2, x: 66.66, y: 0, width: 33.33, height: 33.33 },
            { id: 3, x: 0, y: 33.33, width: 33.33, height: 33.33 },
            { id: 4, x: 33.33, y: 33.33, width: 33.33, height: 33.33 },
            { id: 5, x: 66.66, y: 33.33, width: 33.33, height: 33.33 },
            { id: 6, x: 0, y: 66.66, width: 33.33, height: 33.33 },
            { id: 7, x: 33.33, y: 66.66, width: 33.33, height: 33.33 },
            { id: 8, x: 66.66, y: 66.66, width: 33.33, height: 33.33 }
        ]
    },
    
    {
        name: "2-Pic: Vertical Split",
        id: "twoVerticalEqual",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 100 },    // Left half
            { id: 1, x: 50, y: 0, width: 50, height: 100 }    // Right half
        ]
    },
    {
        name: "2-Pic: Horizontal Split",
        id: "twoHorizontalEqual",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 100, height: 50 },    // Top half
            { id: 1, x: 0, y: 50, width: 100, height: 50 }    // Bottom half
        ]
    },
    {
        name: "2-Pic: Top Square",
        id: "twoTopSquare",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 100, height: 75 },     // Top square (3:3 ratio in a 3:4 frame)
            { id: 1, x: 0, y: 75, width: 100, height: 25 }     // Bottom rectangle
        ]
    },
    {
        name: "2-Pic: Bottom Square",
        id: "twoBottomSquare",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 100, height: 25 },     // Top rectangle
            { id: 1, x: 0, y: 25, width: 100, height: 75 }     // Bottom square (3:3 ratio in a 3:4 frame)
        ]
    },
    {
        name: "2-Pic: Left 2/3",
        id: "twoLeftTwoThirds",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 66.67, height: 100 },  // Left 2/3
            { id: 1, x: 66.67, y: 0, width: 33.33, height: 100 } // Right 1/3
        ]
    },
    {
        name: "2-Pic: Right 2/3",
        id: "twoRightTwoThirds",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 33.33, height: 100 },  // Left 1/3
            { id: 1, x: 33.33, y: 0, width: 66.67, height: 100 } // Right 2/3
        ]
    },
    {
        name: "3-Pic: Horizontal Split",
        id: "threeHorizontalEqual",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 100, height: 33.33 },    // Top third
            { id: 1, x: 0, y: 33.33, width: 100, height: 33.33 }, // Middle third
            { id: 2, x: 0, y: 66.66, width: 100, height: 33.33 }  // Bottom third
        ]
    },
    {
        name: "3-Pic: Vertical Split",
        id: "threeVerticalEqual",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 33.33, height: 100 },     // Left third
            { id: 1, x: 33.33, y: 0, width: 33.33, height: 100 }, // Middle third
            { id: 2, x: 66.66, y: 0, width: 33.33, height: 100 }  // Right third
        ]
    },
    {
        name: "3-Pic: Left Half & Right Split",
        id: "threeLeftHalfRightSplit",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 100 },     // Left half
            { id: 1, x: 50, y: 0, width: 50, height: 50 },     // Top right
            { id: 2, x: 50, y: 50, width: 50, height: 50 }     // Bottom right
        ]
    },
    {
        name: "3-Pic: Right Half & Left Split",
        id: "threeRightHalfLeftSplit",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 50, y: 0, width: 50, height: 100 },    // Right half
            { id: 1, x: 0, y: 0, width: 50, height: 50 },      // Top left
            { id: 2, x: 0, y: 50, width: 50, height: 50 }      // Bottom left
        ]
    },
    {
        name: "3-Pic: Top Half & Bottom Split",
        id: "threeTopHalfBottomSplit",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 100, height: 50 },     // Top half
            { id: 1, x: 0, y: 50, width: 50, height: 50 },     // Bottom left
            { id: 2, x: 50, y: 50, width: 50, height: 50 }     // Bottom right
        ]
    },
    {
        name: "3-Pic: Bottom Half & Top Split",
        id: "threeBottomHalfTopSplit",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 50, width: 100, height: 50 },    // Bottom half
            { id: 1, x: 0, y: 0, width: 50, height: 50 },      // Top left
            { id: 2, x: 50, y: 0, width: 50, height: 50 }      // Top right
        ]
    },
    {
        name: "4-Pic: Grid (2x2)",
        id: "fourCrossSplit",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 50 },      // Top left
            { id: 1, x: 50, y: 0, width: 50, height: 50 },     // Top right
            { id: 2, x: 0, y: 50, width: 50, height: 50 },     // Bottom left
            { id: 3, x: 50, y: 50, width: 50, height: 50 }     // Bottom right
        ]
    },
    {
        name: "4-Pic: Vertical Split",
        id: "fourVerticalEqual",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 25, height: 100 },     // First column
            { id: 1, x: 25, y: 0, width: 25, height: 100 },    // Second column
            { id: 2, x: 50, y: 0, width: 25, height: 100 },    // Third column
            { id: 3, x: 75, y: 0, width: 25, height: 100 }     // Fourth column
        ]
    },
    {
        name: "4-Pic: Horizontal Split",
        id: "fourHorizontalEqual",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 100, height: 25 },     // First row
            { id: 1, x: 0, y: 25, width: 100, height: 25 },    // Second row
            { id: 2, x: 0, y: 50, width: 100, height: 25 },    // Third row
            { id: 3, x: 0, y: 75, width: 100, height: 25 }     // Fourth row
        ]
    },
    {
        name: "4-Pic: Right Half & Left Split",
        id: "fourRightHalfLeftSplit",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 50, y: 0, width: 50, height: 100 },    // Right half
            { id: 1, x: 0, y: 0, width: 50, height: 33.33 },   // Top left
            { id: 2, x: 0, y: 33.33, width: 50, height: 33.33 }, // Middle left
            { id: 3, x: 0, y: 66.66, width: 50, height: 33.33 }  // Bottom left
        ]
    },
    {
        name: "4-Pic: Top Half & Bottom Split",
        id: "fourTopHalfBottomSplit",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 100, height: 50 },     // Top half
            { id: 1, x: 0, y: 50, width: 33.33, height: 50 },  // Bottom left
            { id: 2, x: 33.33, y: 50, width: 33.33, height: 50 }, // Bottom middle
            { id: 3, x: 66.66, y: 50, width: 33.33, height: 50 }  // Bottom right
        ]
    },
    {
        name: "5-Pic: Left 2 & Right 3",
        id: "fiveLeftTwoRightThree",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 50 },       // Top left
            { id: 1, x: 0, y: 50, width: 50, height: 50 },      // Bottom left
            { id: 2, x: 50, y: 0, width: 50, height: 33.33 },   // Top right
            { id: 3, x: 50, y: 33.33, width: 50, height: 33.33 }, // Middle right
            { id: 4, x: 50, y: 66.66, width: 50, height: 33.33 }  // Bottom right
        ]
    },
    {
        name: "5-Pic: Top 2 & Bottom 3",
        id: "fiveTopTwoBottomThree",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 50 },       // Top left
            { id: 1, x: 50, y: 0, width: 50, height: 50 },      // Top right
            { id: 2, x: 0, y: 50, width: 33.33, height: 50 },   // Bottom left
            { id: 3, x: 33.33, y: 50, width: 33.33, height: 50 }, // Bottom middle
            { id: 4, x: 66.66, y: 50, width: 33.33, height: 50 }  // Bottom right
        ]
    },
    {
        name: "5-Pic: Top 3 & Bottom 2",
        id: "fiveTopThreeBottomTwo",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 33.33, height: 50 },    // Top left
            { id: 1, x: 33.33, y: 0, width: 33.33, height: 50 }, // Top middle
            { id: 2, x: 66.66, y: 0, width: 33.33, height: 50 }, // Top right
            { id: 3, x: 0, y: 50, width: 50, height: 50 },      // Bottom left
            { id: 4, x: 50, y: 50, width: 50, height: 50 }      // Bottom right
        ]
    },
    {
        name: "5-Pic: Left 4 Equal",
        id: "fiveLeftFour",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 25 },       // Top left
            { id: 1, x: 0, y: 25, width: 50, height: 25 },      // Upper middle left
            { id: 2, x: 0, y: 50, width: 50, height: 25 },      // Lower middle left
            { id: 3, x: 0, y: 75, width: 50, height: 25 },      // Bottom left
            { id: 4, x: 50, y: 0, width: 50, height: 100 }      // Right full
        ]
    },
    {
        name: "5-Pic: Horizontal Equal",
        id: "fiveHorizontalEqual",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 100, height: 20 },      // First row
            { id: 1, x: 0, y: 20, width: 100, height: 20 },     // Second row
            { id: 2, x: 0, y: 40, width: 100, height: 20 },     // Third row
            { id: 3, x: 0, y: 60, width: 100, height: 20 },     // Fourth row
            { id: 4, x: 0, y: 80, width: 100, height: 20 }      // Fifth row
        ]
    },
    {
        name: "5-Pic: Center Focus",
        id: "fiveCenterFocus",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 75, height: 25 },      // Top bar
            { id: 1, x: 0, y: 25, width: 25, height: 75 },     // Left bar
            { id: 2, x: 25, y: 75, width: 75, height: 25 },    // Bottom bar
            { id: 3, x: 75, y: 0, width: 25, height: 75 },     // Right bar
            { id: 4, x: 25, y: 25, width: 50, height: 50 }     // Center square
        ]
    },

    {
        name: "6-Pic: 2×3 Grid",
        id: "sixGrid2x3",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 33.33, height: 50 },       // Top left
            { id: 1, x: 33.33, y: 0, width: 33.33, height: 50 },   // Top middle
            { id: 2, x: 66.66, y: 0, width: 33.33, height: 50 },   // Top right
            { id: 3, x: 0, y: 50, width: 33.33, height: 50 },      // Bottom left
            { id: 4, x: 33.33, y: 50, width: 33.33, height: 50 },  // Bottom middle
            { id: 5, x: 66.66, y: 50, width: 33.33, height: 50 }   // Bottom right
        ]
    },
    {
        name: "6-Pic: 3×2 Grid",
        id: "sixGrid3x2",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 33.33 },       // Top left
            { id: 1, x: 50, y: 0, width: 50, height: 33.33 },      // Top right
            { id: 2, x: 0, y: 33.33, width: 50, height: 33.33 },   // Middle left
            { id: 3, x: 50, y: 33.33, width: 50, height: 33.33 },  // Middle right
            { id: 4, x: 0, y: 66.66, width: 50, height: 33.33 },   // Bottom left
            { id: 5, x: 50, y: 66.66, width: 50, height: 33.33 }   // Bottom right
        ]
    },
    {
        name: "6-Pic: Featured Bottom Left",
        id: "sixFeaturedBottomLeft",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 33.33, height: 33.33 },    // Top left
            { id: 1, x: 33.33, y: 0, width: 33.33, height: 33.33 }, // Top middle
            { id: 2, x: 66.66, y: 0, width: 33.33, height: 33.33 }, // Top right
            { id: 3, x: 66.66, y: 33.33, width: 33.33, height: 33.33 }, // Middle right
            { id: 4, x: 66.66, y: 66.66, width: 33.33, height: 33.33 }, // Bottom right
            { id: 5, x: 0, y: 33.33, width: 66.66, height: 66.66 }  // Featured bottom left (2×2)
        ]
    },
    {
        name: "6-Pic: Split Right Halves",
        id: "sixSplitRightHalves",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 50 },       // Top left
            { id: 1, x: 0, y: 50, width: 50, height: 50 },      // Bottom left
            { id: 2, x: 50, y: 0, width: 50, height: 25 },      // Top right 1
            { id: 3, x: 50, y: 25, width: 50, height: 25 },     // Top right 2
            { id: 4, x: 50, y: 50, width: 50, height: 25 },     // Bottom right 1
            { id: 5, x: 50, y: 75, width: 50, height: 25 }      // Bottom right 2
        ]
    },
    {
        name: "6-Pic: Left 5 & Right 1",
        id: "sixLeftFiveRightOne",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 50, height: 20 },       // Left top 1
            { id: 1, x: 0, y: 20, width: 50, height: 20 },      // Left top 2
            { id: 2, x: 0, y: 40, width: 50, height: 20 },      // Left middle 1
            { id: 3, x: 0, y: 60, width: 50, height: 20 },      // Left middle 2
            { id: 4, x: 0, y: 80, width: 50, height: 20 },      // Left bottom
            { id: 5, x: 50, y: 0, width: 50, height: 100 }      // Right full
        ]
    },
    {
        name: "6-Pic: Split Upper Halves",
        id: "sixSplitUpperHalves",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 25, height: 50 },       // Upper left 1
            { id: 1, x: 25, y: 0, width: 25, height: 50 },      // Upper left 2
            { id: 2, x: 50, y: 0, width: 25, height: 50 },      // Upper right 1
            { id: 3, x: 75, y: 0, width: 25, height: 50 },      // Upper right 2
            { id: 4, x: 0, y: 50, width: 50, height: 50 },      // Lower left
            { id: 5, x: 50, y: 50, width: 50, height: 50 }      // Lower right
        ]
    },
    {
        name: "Panorama Top",
        id: "panoramaTop",
        aspectRatio: "3:4",
        cells: [
            { id: 0, x: 0, y: 0, width: 100, height: 40 },    // Panorama top
            { id: 1, x: 0, y: 40, width: 33.33, height: 60 }, // Bottom left
            { id: 2, x: 33.33, y: 40, width: 33.33, height: 60 }, // Bottom middle
            { id: 3, x: 66.66, y: 40, width: 33.33, height: 60 }  // Bottom right
        ]
    },
    {
        name: "Instagram Grid",
        id: "instagramGrid",
        aspectRatio: "1:1",
        cells: [
            { id: 0, x: 0, y: 0, width: 33.33, height: 33.33 },
            { id: 1, x: 33.33, y: 0, width: 33.33, height: 33.33 },
            { id: 2, x: 66.66, y: 0, width: 33.33, height: 33.33 },
            { id: 3, x: 0, y: 33.33, width: 33.33, height: 33.33 },
            { id: 4, x: 33.33, y: 33.33, width: 33.33, height: 33.33 },
            { id: 5, x: 66.66, y: 33.33, width: 33.33, height: 33.33 },
            { id: 6, x: 0, y: 66.66, width: 66.66, height: 33.33 },
            { id: 7, x: 66.66, y: 66.66, width: 33.33, height: 33.33 }
        ]
    },
    {
        name: "Golden Ratio",
        id: "goldenRatio",
        aspectRatio: "1.618:1",
        cells: [
            { id: 0, x: 0, y: 0, width: 61.8, height: 100 },  // Left (golden ratio)
            { id: 1, x: 61.8, y: 0, width: 38.2, height: 61.8 }, // Top right
            { id: 2, x: 61.8, y: 61.8, width: 38.2, height: 38.2 } // Bottom right
        ]
    }
];

export {layoutLibrary};