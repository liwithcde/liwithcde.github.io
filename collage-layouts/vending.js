// Layout Library that defines different collage layouts
import { layoutLibrary } from "./layout.js";

console.log(layoutLibrary);

// Legacy grid layouts configuration
const gridLayouts = {
    '1x1': { rows: 1, cols: 1 },
    '2x1': { rows: 1, cols: 2 },
    '1x2': { rows: 2, cols: 1 },
    '2x2': { rows: 2, cols: 2 },
    '3x2': { rows: 2, cols: 3 }
};

class CollageLayout {
    constructor() {
        this.selectedLayout = layoutLibrary[0]; // Default to first layout
        this.frameWidth = 2;
        this.collageFrame = document.getElementById('collageFrame');
        this.frameWidthInput = document.getElementById('frameWidth');
        this.frameWidthValue = document.getElementById('frameWidthValue');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.collageFrame.appendChild(this.canvas);
        this.images = new Map(); // Store images for each cell
        this.imagePositions = new Map(); // Store position and scale of each image
        this.highlightedCell = null; // Track which cell is being dragged over
        
        // For drag and resize operations
        this.isDragging = false;
        this.isResizing = false;
        this.activeCell = null;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.lastOffsetX = 0;
        this.lastOffsetY = 0;
        this.lastScale = 1;
    }

    initialize() {
        this.initializeLayoutOptions();
        this.initializeFrameControls();
        this.initializeCanvasInteractions();
        this.initializeDownloadButton();
        this.setupDropZone();
        this.setupAutoFill();
        this.updateFrame();
        
        // Add resize event listener
        window.addEventListener('resize', () => {
            this.updateFrame();
        });
    }

    initializeLayoutOptions() {
        const layoutCategories = document.getElementById('layoutCategories');
        layoutCategories.innerHTML = ''; // Clear existing content
        
        // Categorize layouts by cell count
        const categorizedLayouts = {};
        
        layoutLibrary.forEach(layout => {
            const cellCount = layout.cells.length;
            if (!categorizedLayouts[cellCount]) {
                categorizedLayouts[cellCount] = [];
            }
            categorizedLayouts[cellCount].push(layout);
        });
        
        // Sort categories by cell count
        const sortedCellCounts = Object.keys(categorizedLayouts).map(Number).sort((a, b) => a - b);
        
        // Create the tab navigation for selecting picture count with horizontal scrolling
        const tabNavScroller = document.createElement('div');
        tabNavScroller.className = 'layout-tabs-scroller';
        
        const tabNav = document.createElement('div');
        tabNav.className = 'layout-tabs';
        tabNavScroller.appendChild(tabNav);
        
        // Create the container for layout options
        const layoutOptionsContainer = document.createElement('div');
        layoutOptionsContainer.className = 'layout-options-container';
        
        // Create tabs and content for each cell count
        sortedCellCounts.forEach((cellCount, index) => {
            // Create the tab button
            const tabButton = document.createElement('button');
            tabButton.className = 'layout-tab-button';
            tabButton.textContent = `${cellCount} Pics`;
            if (index === 0) tabButton.classList.add('active');
            tabNav.appendChild(tabButton);
            
            // Create scrollable container for layouts
            const layoutsScrollContainer = document.createElement('div');
            layoutsScrollContainer.className = 'layout-options-scroll';
            
            // Create the layouts container for this cell count
            const layoutsForCount = document.createElement('div');
            layoutsForCount.className = 'layout-options-panel';
            layoutsForCount.dataset.cellCount = cellCount;
            if (index === 0) layoutsForCount.classList.add('active');
            
            // Add all layouts for this cell count
            categorizedLayouts[cellCount].forEach((layout, layoutIndex) => {
                const option = this.createLayoutOption(layout, index === 0 && layoutIndex === 0);
                layoutsForCount.appendChild(option);
            });
            
            // Add to the scroll container
            layoutsScrollContainer.appendChild(layoutsForCount);
            
            // Add scroll container to the main container
            layoutOptionsContainer.appendChild(layoutsScrollContainer);
            
            // Add click event for tab switching
            tabButton.addEventListener('click', () => {
                // Remove active class from all tabs and panels
                document.querySelectorAll('.layout-tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.layout-options-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                
                // Add active class to this tab and its panel
                tabButton.classList.add('active');
                layoutsForCount.classList.add('active');
            });
        });
        
        // Add the tabs and layout options to the page
        layoutCategories.appendChild(tabNavScroller);
        layoutCategories.appendChild(layoutOptionsContainer);
    }
    
    createLayoutOption(layout, isSelected) {
        const option = document.createElement('div');
        option.className = 'layout-option';
        option.dataset.layoutId = layout.id;
        option.title = layout.name + (layout.aspectRatio ? ` (${layout.aspectRatio})` : ''); // Add tooltip for name
        if (isSelected) {
            option.classList.add('selected');
            this.selectedLayout = layout;
        }
        
        // Create layout cells preview
        const cellsContainer = document.createElement('div');
        cellsContainer.className = 'layout-cells';
        
        // Apply aspect ratio to preview
        if (layout.aspectRatio) {
            const [w, h] = layout.aspectRatio.split(':').map(Number);
            // Keep the preview within the set height by scaling
            const previewHeight = 90; // Smaller height for thumbnails
            const previewWidth = (previewHeight * w) / h;
            
            if (previewWidth <= 90) { // If it fits within the width
                cellsContainer.style.width = `${previewWidth}px`;
                cellsContainer.style.height = `${previewHeight}px`;
                cellsContainer.style.margin = "0 auto";
            } else {
                // Scale down to fit width
                const scale = 90 / previewWidth;
                cellsContainer.style.width = "90px"; 
                cellsContainer.style.height = `${previewHeight * scale}px`;
            }
        }
        
        layout.cells.forEach(cell => {
            const cellElem = document.createElement('div');
            cellElem.className = 'layout-cell';
            cellElem.style.left = `${cell.x}%`;
            cellElem.style.top = `${cell.y}%`;
            cellElem.style.width = `${cell.width}%`;
            cellElem.style.height = `${cell.height}%`;
            cellsContainer.appendChild(cellElem);
        });
        
        // Add name as a hidden element for accessibility
        const name = document.createElement('div');
        name.className = 'layout-name';
        name.textContent = layout.name;
        if (layout.aspectRatio) {
            name.textContent += ` (${layout.aspectRatio})`;
        }
        
        option.appendChild(cellsContainer);
        option.appendChild(name);
        
        // Add click handler
        option.addEventListener('click', () => {
            // Update selected layout
            document.querySelectorAll('.layout-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');
            this.selectedLayout = layout;
            
            // Clear image mappings when changing layout
            this.images.clear();
            this.imagePositions.clear();
            
            // Auto-fill the new layout with available images
            this.autoFillCollage();
            
            // Render the layout with correct aspect ratio
            this.updateFrame();
        });
        
        return option;
    }

    initializeFrameControls() {
        this.frameWidthInput.addEventListener('input', (e) => {
            this.frameWidth = e.target.value;
            this.updateFrame();
            this.frameWidthValue.textContent = `${this.frameWidth}px`;
        });
    }

    initializeCanvasInteractions() {
        // Mouse down - start drag or resize
        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            
            const mouseX = (e.clientX - rect.left) * scaleX;
            const mouseY = (e.clientY - rect.top) * scaleY;
            
            const cellId = this.getCellFromPosition(mouseX, mouseY);
            if (cellId !== null && this.images.has(cellId)) {
                this.activeCell = cellId;
                
                // Initialize position if not exists
                if (!this.imagePositions.has(cellId)) {
                    this.imagePositions.set(cellId, {
                        offsetX: 0,
                        offsetY: 0,
                        scale: 1
                    });
                }
                
                // Find the selected cell in the layout
                const cell = this.selectedLayout.cells.find(c => c.id === cellId);
                if (!cell) return;
                
                // Calculate cell dimensions in canvas coordinates
                const cellWidth = this.canvas.width * (cell.width / 100);
                const cellHeight = this.canvas.height * (cell.height / 100);
                const cellX = this.canvas.width * (cell.x / 100);
                const cellY = this.canvas.height * (cell.y / 100);
                
                const pos = this.imagePositions.get(cellId);
                const img = this.images.get(cellId);
                
                let imgWidth, imgHeight;
                if (img.width / img.height > cellWidth / cellHeight) {
                    imgWidth = cellWidth * pos.scale;
                    imgHeight = (cellWidth / img.width) * img.height * pos.scale;
                } else {
                    imgHeight = cellHeight * pos.scale;
                    imgWidth = (cellHeight / img.height) * img.width * pos.scale;
                }
                
                const imgCenterX = cellX + cellWidth/2 + pos.offsetX;
                const imgCenterY = cellY + cellHeight/2 + pos.offsetY;
                const imgRight = imgCenterX + imgWidth/2;
                const imgBottom = imgCenterY + imgHeight/2;
                
                const resizeHandleSize = 30 * scaleX;
                
                if (Math.abs(mouseX - imgRight) < resizeHandleSize && 
                    Math.abs(mouseY - imgBottom) < resizeHandleSize) {
                    this.isResizing = true;
                    this.lastScale = pos.scale;
                } else {
                    this.isDragging = true;
                    this.dragStartX = mouseX;
                    this.dragStartY = mouseY;
                    this.lastOffsetX = pos.offsetX;
                    this.lastOffsetY = pos.offsetY;
                }
                
                // Show cursor based on action
                if (this.isResizing) {
                    this.canvas.style.cursor = 'nwse-resize';
                } else {
                    this.canvas.style.cursor = 'move';
                }
            }
        });
        
        // Mouse move - drag or resize
        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging && !this.isResizing) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            
            const mouseX = (e.clientX - rect.left) * scaleX;
            const mouseY = (e.clientY - rect.top) * scaleY;
            
            if (this.isDragging) {
                // Update position
                const deltaX = mouseX - this.dragStartX;
                const deltaY = mouseY - this.dragStartY;
                
                const pos = this.imagePositions.get(this.activeCell);
                pos.offsetX = this.lastOffsetX + deltaX;
                pos.offsetY = this.lastOffsetY + deltaY;
                
                // Find the selected cell in the layout
                const cell = this.selectedLayout.cells.find(c => c.id === this.activeCell);
                if (!cell) return;
                
                // Calculate cell dimensions in canvas coordinates
                const cellWidth = this.canvas.width * (cell.width / 100);
                const cellHeight = this.canvas.height * (cell.height / 100);
                
                // Limit dragging to reasonable bounds
                pos.offsetX = Math.max(Math.min(pos.offsetX, cellWidth), -cellWidth);
                pos.offsetY = Math.max(Math.min(pos.offsetY, cellHeight), -cellHeight);
                
                this.updateFrame();
            } else if (this.isResizing) {
                // Find the selected cell in the layout
                const cell = this.selectedLayout.cells.find(c => c.id === this.activeCell);
                if (!cell) return;
                
                // Calculate cell dimensions in canvas coordinates
                const cellWidth = this.canvas.width * (cell.width / 100);
                const cellHeight = this.canvas.height * (cell.height / 100);
                const cellX = this.canvas.width * (cell.x / 100);
                const cellY = this.canvas.height * (cell.y / 100);
                
                const cellCenterX = cellX + cellWidth/2;
                const cellCenterY = cellY + cellHeight/2;
                
                // Calculate distance from center to mouse
                const distX = Math.abs(mouseX - cellCenterX);
                const distY = Math.abs(mouseY - cellCenterY);
                const maxDistX = cellWidth/2;
                const maxDistY = cellHeight/2;
                
                // Calculate scale based on distance (1.0 to 2.0)
                let newScale = Math.max(distX / maxDistX, distY / maxDistY) * 2;
                newScale = Math.max(0.5, Math.min(newScale, 3)); // Limit scale range
                
                const pos = this.imagePositions.get(this.activeCell);
                pos.scale = newScale;
                
                this.updateFrame();
            }
        });
        
        // Mouse up - end drag or resize
        window.addEventListener('mouseup', () => {
            if (this.isDragging || this.isResizing) {
                this.isDragging = false;
                this.isResizing = false;
                this.canvas.style.cursor = 'default';
            }
        });
        
        // Touch support
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousedown', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                this.canvas.dispatchEvent(mouseEvent);
            }
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                window.dispatchEvent(mouseEvent);
            }
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup');
            window.dispatchEvent(mouseEvent);
        });
    }

    getCellFromPosition(x, y) {
        // Convert canvas coordinates to percentages
        const percentX = (x / this.canvas.width) * 100;
        const percentY = (y / this.canvas.height) * 100;
        
        // Find which cell contains these coordinates
        for (const cell of this.selectedLayout.cells) {
            if (
                percentX >= cell.x && 
                percentX <= cell.x + cell.width && 
                percentY >= cell.y && 
                percentY <= cell.y + cell.height
            ) {
                return cell.id;
            }
        }
        
        return null;
    }

    updateFrame() {
        // Get layout aspect ratio if specified
        let aspectRatio = "3:4"; // Default aspect ratio
        if (this.selectedLayout.aspectRatio) {
            aspectRatio = this.selectedLayout.aspectRatio;
        }
        const [w, h] = aspectRatio.split(':').map(Number);
        
        // Fixed internal resolution
        const internalHeight = 4000; // Backend resolution height
        const internalWidth = (internalHeight * w) / h; // Calculate width based on aspect ratio
        
        // Get container width for display sizing
        const containerWidth = Math.max(this.collageFrame.offsetWidth - 40, 300);
        
        // For desktop, use a larger percentage of the available space
        let displayWidth;
        if (window.innerWidth > 768) {
            displayWidth = Math.min(containerWidth, 1200); // Larger max size on desktop
        } else {
            displayWidth = Math.min(containerWidth, 900);
        }
        
        const displayHeight = (displayWidth * h) / w; // Keep aspect ratio for display
        
        // Set canvas internal size to high resolution
        this.canvas.width = internalWidth;
        this.canvas.height = internalHeight;
        
        // Set display size
        this.canvas.style.width = `${displayWidth}px`; 
        this.canvas.style.height = `${displayHeight}px`;
        
        // Clear canvas
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, internalWidth, internalHeight);

        const cellWidth = internalWidth / 100;
        const cellHeight = internalHeight / 100;
        
        // Scale frameWidth for high resolution
        const scaledFrameWidth = this.frameWidth * (internalWidth / displayWidth);

        // Draw all cell backgrounds and images first
        for (const cell of this.selectedLayout.cells) {
            const x = cell.x * cellWidth;
            const y = cell.y * cellHeight;
            const width = cell.width * cellWidth;
            const height = cell.height * cellHeight;

            // Draw cell background
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(x, y, width, height);
            
            // If this is the cell being dragged over, highlight it
            if (cell.id === this.highlightedCell) {
                this.ctx.fillStyle = 'rgba(9, 132, 227, 0.2)';
                this.ctx.fillRect(x, y, width, height);
            }

            // Draw image if exists
            if (this.images.has(cell.id)) {
                const img = this.images.get(cell.id);
                this.drawImageInCell(img, x, y, width, height, cell.id);
            }
        }

        // Draw cell borders
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = scaledFrameWidth;
        
        // Draw each cell border
        for (const cell of this.selectedLayout.cells) {
            const x = cell.x * cellWidth;
            const y = cell.y * cellHeight;
            const width = cell.width * cellWidth;
            const height = cell.height * cellHeight;
            
            this.ctx.strokeRect(x, y, width, height);
        }
        
        // Draw the outer frame with double width
        this.ctx.lineWidth = scaledFrameWidth * 2;
        this.ctx.beginPath();
        this.ctx.rect(0, 0, internalWidth, internalHeight);
        this.ctx.stroke();
    }

    drawImageInCell(img, x, y, width, height, cellId) {
        const pos = this.imagePositions.get(cellId) || { offsetX: 0, offsetY: 0, scale: 1 };
        
        // Save context state before clipping
        this.ctx.save();
        
        // Create clipping path for the cell
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.clip();
        
        // Calculate aspect ratio
        const imgAspect = img.width / img.height;
        const cellAspect = width / height;
        
        let drawWidth, drawHeight;
        
        // FILL approach: use the larger dimension to ensure cell is fully covered
        if (imgAspect > cellAspect) {
            // Image is wider than cell - match height and allow width to extend beyond
            drawHeight = height * pos.scale;
            drawWidth = (height * imgAspect) * pos.scale;
        } else {
            // Image is taller than cell - match width and allow height to extend beyond
            drawWidth = width * pos.scale;
            drawHeight = (width / imgAspect) * pos.scale;
        }
        
        // Calculate center position with offset
        const centerX = x + width/2 + pos.offsetX;
        const centerY = y + height/2 + pos.offsetY;
        
        // Draw image centered at position with offset
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.ctx.drawImage(
            img, 
            centerX - drawWidth/2, 
            centerY - drawHeight/2, 
            drawWidth, 
            drawHeight
        );
        
        // Restore context state (removes clipping)
        this.ctx.restore();
        
        // Draw resize handle if this is the active cell (outside of clipping)
        if (cellId === this.activeCell) {
            this.ctx.fillStyle = 'rgba(9, 132, 227, 0.7)';
            this.ctx.beginPath();
            this.ctx.arc(
                centerX + drawWidth/2, 
                centerY + drawHeight/2, 
                15, 0, Math.PI * 2
            );
            this.ctx.fill();
        }
    }

    addImageToCell(cellIndex, imageUrl) {
        const img = new Image();
        img.onload = () => {
            this.images.set(cellIndex, img);
            
            // Set initial position with a scale that ensures cell is filled
            this.imagePositions.set(cellIndex, {
                offsetX: 0,
                offsetY: 0,
                scale: 1.1 // Slightly larger than 1 to ensure cell is filled with some margin
            });
            
            this.updateFrame();
        };
        img.src = imageUrl;
    }

    initializeDownloadButton() {
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.addEventListener('click', () => {
            // Create a temporary link
            const link = document.createElement('a');
            
            // Convert canvas to data URL with desired resolution
            link.href = this.canvas.toDataURL('image/png');
            
            // Set download attribute with filename
            link.download = 'collage.png';
            
            // Append link to body, click it, and remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    setupDropZone() {
        // Handle click selection of images from pool to cells
        const imagePool = document.getElementById('imagePool');
        imagePool.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                const img = e.target;
                // Store the selected image URL to be used when a cell is clicked
                this.selectedImageUrl = img.src;
            }
        });
        
        // Handle file uploads through drag and drop
        document.addEventListener('DOMContentLoaded', () => {
            const uploadSection = document.querySelector('.upload-section');
            
            uploadSection.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadSection.classList.add('dragover');
            });
            
            uploadSection.addEventListener('dragleave', () => {
                uploadSection.classList.remove('dragover');
            });
            
            uploadSection.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadSection.classList.remove('dragover');
                
                const files = e.dataTransfer.files;
                const imageUpload = document.getElementById('imageUpload');
                
                if (files.length > 0 && files[0].type.match('image.*')) {
                    imageUpload.files = files;
                    this.handleImageUpload(files, () => {
                        // Auto-fill the collage with the newly uploaded images
                        this.autoFillCollage();
                    });
                }
            });
        });
        
        // Handle file inputs from upload button
        const imageUpload = document.getElementById('imageUpload');
        imageUpload.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                this.handleImageUpload(files, () => {
                    // Auto-fill will be called by the setupAutoFill method
                });
            }
        });
        
        // Setup drag and drop between image pool and canvas
        const imageItems = document.querySelectorAll('.image-item');
        
        imageItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.src);
                this.draggingImageUrl = item.src;
                item.classList.add('dragging');
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });
        
        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            
            const mouseX = (e.clientX - rect.left) * scaleX;
            const mouseY = (e.clientY - rect.top) * scaleY;
            
            const cellId = this.getCellFromPosition(mouseX, mouseY);
            
            if (cellId !== null) {
                if (this.highlightedCell !== cellId) {
                    this.highlightedCell = cellId;
                    this.updateFrame();
                }
            } else if (this.highlightedCell !== null) {
                this.highlightedCell = null;
                this.updateFrame();
            }
        });
        
        this.canvas.addEventListener('dragleave', () => {
            if (this.highlightedCell !== null) {
                this.highlightedCell = null;
                this.updateFrame();
            }
        });
        
        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            
            const mouseX = (e.clientX - rect.left) * scaleX;
            const mouseY = (e.clientY - rect.top) * scaleY;
            
            const cellId = this.getCellFromPosition(mouseX, mouseY);
            
            if (cellId !== null) {
                let imageUrl;
                
                if (this.draggingImageUrl) {
                    imageUrl = this.draggingImageUrl;
                    this.draggingImageUrl = null;
                } else {
                    const files = e.dataTransfer.files;
                    if (files.length > 0 && files[0].type.match('image.*')) {
                        const file = files[0];
                        const reader = new FileReader();
                        
                        reader.onload = (event) => {
                            imageUrl = event.target.result;
                            this.addImageToCell(cellId, imageUrl);
                        };
                        
                        reader.readAsDataURL(file);
                        return;
                    } else {
                        // Try to get URL from dataTransfer
                        imageUrl = e.dataTransfer.getData('text/plain');
                    }
                }
                
                if (imageUrl) {
                    this.addImageToCell(cellId, imageUrl);
                }
            }
            
            this.highlightedCell = null;
            this.updateFrame();
        });
        
        // Allow clicking on cells to place selected image
        this.canvas.addEventListener('click', (e) => {
            if (!this.selectedImageUrl) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            
            const mouseX = (e.clientX - rect.left) * scaleX;
            const mouseY = (e.clientY - rect.top) * scaleY;
            
            const cellId = this.getCellFromPosition(mouseX, mouseY);
            
            if (cellId !== null) {
                this.addImageToCell(cellId, this.selectedImageUrl);
                this.selectedImageUrl = null; // Clear selection after placing
            }
        });
    }
    
    handleImageUpload(files, callback) {
        const imagePool = document.getElementById('imagePool');
        let processedCount = 0;
        
        // Clear the image pool if it's the first upload
        if (imagePool.children.length === 0) {
            imagePool.innerHTML = '';
        }
        
        Array.from(files).forEach(file => {
            if (!file.type.match('image.*')) return;
            
            // Create a loading placeholder
            const loadingItem = document.createElement('div');
            loadingItem.className = 'image-item loading';
            const loader = document.createElement('div');
            loader.className = 'loader';
            loadingItem.appendChild(loader);
            imagePool.appendChild(loadingItem);
            
            const reader = new FileReader();
            
            reader.onload = (e) => {
                // Create container for the image and delete button
                const container = document.createElement('div');
                container.className = 'image-container';
                
                // Create image element
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'image-item';
                img.draggable = true;
                
                // Create delete button
                const deleteBtn = document.createElement('div');
                deleteBtn.className = 'image-delete-btn';
                deleteBtn.innerHTML = '×';
                deleteBtn.title = 'Delete image';
                
                // Add click event for image selection
                img.addEventListener('click', (e) => {
                    // Prevent triggering delete button click
                    e.stopPropagation();
                    
                    // Toggle selection class
                    const wasSelected = img.classList.contains('selected');
                    
                    // First, remove 'selected' class from all images
                    document.querySelectorAll('.image-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    
                    // If it wasn't already selected, select it
                    if (!wasSelected) {
                        img.classList.add('selected');
                        this.selectedImageUrl = img.src;
                    } else {
                        this.selectedImageUrl = null;
                    }
                });
                
                // Add delete functionality
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent bubbling to container
                    
                    // Remove the container and image
                    container.remove();
                    
                    // If this was the selected image, clear the selection
                    if (this.selectedImageUrl === img.src) {
                        this.selectedImageUrl = null;
                    }
                    
                    // If this image is used in the collage, remove it
                    this.removeImageFromCollage(img.src);
                    
                    // Re-auto-fill collage if needed
                    if (imagePool.querySelectorAll('img').length > 0) {
                        this.autoFillCollage();
                    }
                });
                
                // Setup drag events for the new image
                img.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', img.src);
                    this.draggingImageUrl = img.src;
                    img.classList.add('dragging');
                });
                
                img.addEventListener('dragend', () => {
                    img.classList.remove('dragging');
                });
                
                // Add the image and delete button to the container
                container.appendChild(img);
                container.appendChild(deleteBtn);
                
                // Replace the loading placeholder with the actual image container
                imagePool.replaceChild(container, loadingItem);
                
                // Increment processed count and check if all files are processed
                processedCount++;
                if (processedCount === files.length && callback) {
                    callback();
                }
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    // Method to remove an image from the collage if it's deleted from the pool
    removeImageFromCollage(imageUrl) {
        // Find and remove the image from all cells
        this.selectedLayout.cells.forEach(cell => {
            const img = this.images.get(cell.id);
            if (img && img.src === imageUrl) {
                this.images.delete(cell.id);
                this.imagePositions.delete(cell.id);
            }
        });
        
        // Update the frame
        this.updateFrame();
    }

    // Add a method to automatically fill the collage with available images
    autoFillCollage() {
        // Clear existing image mappings
        this.images.clear();
        this.imagePositions.clear();
        
        // Get all uploaded images in the pool
        const imageElements = document.querySelectorAll('#imagePool .image-container img.image-item');
        if (imageElements.length === 0) return; // No images available
        
        // Fill each cell in the layout with an image
        this.selectedLayout.cells.forEach((cell, index) => {
            // Get an image (cycle through available images if there are fewer images than cells)
            const imageIndex = index % imageElements.length;
            const imageUrl = imageElements[imageIndex].src;
            
            // Add the image to the cell
            this.addImageToCell(cell.id, imageUrl);
        });
        
        // Update the frame
        this.updateFrame();
    }

    // Set up initial auto-fill if there are existing images
    setupAutoFill() {
        // Once the DOM is fully loaded, check if there are any images in the pool already
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                // Check if there are any images in the pool and auto-fill if needed
                const imageElements = document.querySelectorAll('#imagePool .image-container img.image-item');
                if (imageElements.length > 0) {
                    this.autoFillCollage();
                }
            }, 500);
        });
    }
}

let uploadedImages = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const collageLayout = new CollageLayout();
    collageLayout.initialize();
    initializeImageUpload(collageLayout);
});

function initializeImageUpload(collageLayout) {
    const imageUpload = document.getElementById('imageUpload');
    const imagePool = document.getElementById('imagePool');
    
    // The actual upload is handled by collageLayout.handleImageUpload,
    // so we don't need to duplicate that functionality here
} 