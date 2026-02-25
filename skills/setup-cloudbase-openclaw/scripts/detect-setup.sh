#!/bin/bash
# CloudBase OpenClaw/Moltbot Setup Detection Script
# This script auto-detects your installation and helps configure CloudBase support

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Function to display usage
usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  detect           Detect installation and configuration (default)"
    echo "  copy-template    Copy app template to a new directory"
    echo ""
    echo "Options for copy-template:"
    echo "  --dest DIR       Destination directory (default: ../my-new-project)"
    echo ""
    echo "Examples:"
    echo "  $0 detect"
    echo "  $0 copy-template --dest ../my-new-project"
    exit 1
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1"
        return 0
    else
        echo -e "${RED}✗${NC} Not found: $1"
        return 1
    fi
}

# Function to find installation directory
find_install_dir() {
    if check_dir "$HOME/.openclaw" 2>/dev/null; then
        echo "$HOME/.openclaw"
    elif check_dir "$HOME/.clawdbot" 2>/dev/null; then
        echo "$HOME/.clawdbot"
    elif check_dir "$HOME/.moltbot" 2>/dev/null; then
        echo "$HOME/.moltbot"
    else
        echo ""
    fi
}

# Function to find config file
find_config_file() {
    local install_dir="$1"
    
    if [ -f "$install_dir/moltbot.json" ]; then
        echo "$install_dir/moltbot.json"
    elif [ -f "$install_dir/config.json" ]; then
        echo "$install_dir/config.json"
    elif [ -f "$HOME/.moltbot/moltbot.json" ]; then
        echo "$HOME/.moltbot/moltbot.json"
    else
        echo ""
    fi
}

# Function to extract workspace from config
extract_workspace() {
    local config_file="$1"
    
    if [ -n "$config_file" ] && [ -f "$config_file" ]; then
        grep -o '"workspace"[[:space:]]*:[[:space:]]*"[^"]*"' "$config_file" 2>/dev/null | sed 's/.*: *"\([^"]*\)".*/\1/' || echo "$HOME/clawd"
    else
        echo "$HOME/clawd"
    fi
}

# Function to run detection
detect() {
    echo -e "${BLUE}=== CloudBase OpenClaw/Moltbot Setup Detection ===${NC}\n"

    # Step 1: Detect installation directory
    echo -e "${YELLOW}[Step 1] Detecting installation directory...${NC}"
    INSTALL_DIR=$(find_install_dir)
    CONFIG_FILE=""

    if [ -z "$INSTALL_DIR" ]; then
        echo -e "${RED}Could not find OpenClaw/Moltbot installation directory.${NC}"
        echo "Please check your installation and try again."
        exit 1
    fi

    if [ -f "$INSTALL_DIR/moltbot.json" ]; then
        CONFIG_FILE="$INSTALL_DIR/moltbot.json"
    elif [ -f "$INSTALL_DIR/config.json" ]; then
        CONFIG_FILE="$INSTALL_DIR/config.json"
    fi

    if [ -z "$CONFIG_FILE" ]; then
        CONFIG_FILE=$(find_config_file "$INSTALL_DIR")
    fi

    echo -e "${GREEN}Installation directory:${NC} $INSTALL_DIR"
    echo -e "${GREEN}Configuration file:${NC} ${CONFIG_FILE:-Not found}"
    echo ""

    # Step 2: Extract workspace path
    echo -e "${YELLOW}[Step 2] Finding workspace directory...${NC}"
    WORKSPACE=$(extract_workspace "$CONFIG_FILE")
    
    if [ -n "$WORKSPACE" ]; then
        echo -e "${GREEN}Workspace directory:${NC} $WORKSPACE"
    else
        WORKSPACE="$HOME/clawd"
        echo -e "${BLUE}Using default workspace:${NC} $WORKSPACE"
    fi
    echo ""

    # Step 3: Check workspace structure
    echo -e "${YELLOW}[Step 3] Checking workspace structure...${NC}"
    if [ -d "$WORKSPACE" ]; then
        echo -e "${GREEN}✓${NC} Workspace exists"

        # Check for AGENTS.md
        if [ -f "$WORKSPACE/AGENTS.md" ]; then
            echo -e "${GREEN}✓${NC} AGENTS.md found"
        else
            echo -e "${YELLOW}⚠${NC} AGENTS.md not found (will be created)"
        fi

        # Check for skills directory
        if [ -d "$WORKSPACE/skills" ] || [ -L "$WORKSPACE/skills" ]; then
            echo -e "${GREEN}✓${NC} Skills directory found"
        else
            echo -e "${YELLOW}⚠${NC} Skills directory not found"
        fi

        # Check for config directory
        if [ -d "$WORKSPACE/config" ]; then
            echo -e "${GREEN}✓${NC} Config directory found"
            if [ -f "$WORKSPACE/config/mcporter.json" ]; then
                echo -e "${GREEN}✓${NC} mcporter.json found"
            else
                echo -e "${YELLOW}⚠${NC} mcporter.json not found (needs to be created)"
            fi
        else
            echo -e "${YELLOW}⚠${NC} Config directory not found"
        fi

        # Check for app template
        if [ -d "$WORKSPACE/app" ]; then
            echo -e "${GREEN}✓${NC} App template found (can be copied for new projects)"
        else
            echo -e "${YELLOW}⚠${NC} App template not found"
        fi
    else
        echo -e "${RED}✗${NC} Workspace directory does not exist: $WORKSPACE"
    fi
    echo ""

    # Step 4: Check for CloudBase MCP tools availability
    echo -e "${YELLOW}[Step 4] Checking mcporter configuration...${NC}"
    if [ -f "$WORKSPACE/config/mcporter.json" ]; then
        if grep -q "cloudbase-mcp" "$WORKSPACE/config/mcporter.json" 2>/dev/null; then
            echo -e "${GREEN}✓${NC} CloudBase MCP configured in mcporter.json"
        else
            echo -e "${YELLOW}⚠${NC} CloudBase MCP not configured in mcporter.json"
        fi
    else
        echo -e "${YELLOW}⚠${NC} mcporter.json not found"
    fi
    echo ""

    # Step 5: Check for installed CloudBase skills
    echo -e "${YELLOW}[Step 5] Checking for CloudBase skills...${NC}"
    CLOUDBASE_SKILLS_COUNT=0

    if [ -d "$WORKSPACE/skills" ] || [ -L "$WORKSPACE/skills" ]; then
        for skill in cloudbase-guidelines web-development miniprogram-development cloud-functions; do
            if [ -e "$WORKSPACE/skills/$skill" ] || [ -L "$WORKSPACE/skills/$skill" ]; then
                echo -e "${GREEN}✓${NC} Found skill: $skill"
                CLOUDBASE_SKILLS_COUNT=$((CLOUDBASE_SKILLS_COUNT + 1))
            fi
        done
    fi

    if [ $CLOUDBASE_SKILLS_COUNT -eq 0 ]; then
        echo -e "${YELLOW}⚠${NC} No CloudBase skills found"
    fi
    echo ""

    # Summary
    echo -e "${BLUE}=== Summary ===${NC}"
    echo -e "Installation: ${GREEN}$INSTALL_DIR${NC}"
    echo -e "Workspace: ${GREEN}$WORKSPACE${NC}"
    echo -e "Config: ${GREEN}${CONFIG_FILE:-Not found}${NC}"
    echo ""

    # Next steps
    echo -e "${BLUE}=== Next Steps ===${NC}"
    
    NEEDS_MCP=false
    if [ ! -f "$WORKSPACE/config/mcporter.json" ] || ! grep -q "cloudbase-mcp" "$WORKSPACE/config/mcporter.json" 2>/dev/null; then
        NEEDS_MCP=true
    fi

    if [ "$NEEDS_MCP" = true ]; then
        echo -e "${YELLOW}1.${NC} Configure CloudBase MCP:"
        echo "   - Get your Environment ID from https://tcb.cloud.tencent.com"
        echo "   - Get SecretId/SecretKey from https://console.cloud.tencent.com/cam/capi"
        echo "   - Create or update $WORKSPACE/config/mcporter.json"
        echo ""
    fi

    if [ $CLOUDBASE_SKILLS_COUNT -eq 0 ]; then
        echo -e "${YELLOW}2.${NC} Install CloudBase skills:"
        echo "   cd $WORKSPACE"
        echo "   npx skills add tencentcloudbase/skills -y"
        echo ""
    fi

    if [ ! -f "$WORKSPACE/AGENTS.md" ]; then
        echo -e "${YELLOW}3.${NC} Create AGENTS.md with CloudBase rules"
        echo ""
    fi

    if [ -d "$WORKSPACE/app" ]; then
        echo -e "${YELLOW}4.${NC} (Optional) Copy app template for a new project:"
        echo "   cp -r $WORKSPACE/app $WORKSPACE/my-new-project"
        echo "   Or run: $0 copy-template --dest $WORKSPACE/my-new-project"
        echo ""
    fi

    echo -e "${YELLOW}5.${NC} Restart the gateway:"
    if command -v moltbot &> /dev/null; then
        echo "   moltbot gateway restart"
    elif command -v clawdbot &> /dev/null; then
        echo "   clawdbot restart"
    else
        echo "   systemctl --user restart moltbot  # or clawdbot"
    fi
    echo ""

    echo -e "${GREEN}Setup detection complete!${NC}"
    echo -e "Follow the steps above to complete your CloudBase setup."
}

# Function to copy app template
copy_template() {
    local dest_dir="$1"
    # Find workspace by detecting from config (same logic as detect function)
    local install_dir=$(find_install_dir)
    local config_file=$(find_config_file "$install_dir")
    local workspace=$(extract_workspace "$config_file")
    local app_dir="$workspace/app"
    
    if [ -z "$dest_dir" ]; then
        dest_dir="$workspace/my-new-project"
    fi

    # Convert relative path to absolute
    if [[ ! "$dest_dir" = /* ]]; then
        dest_dir="$(pwd)/$dest_dir"
    fi

    echo -e "${BLUE}=== Copying CloudBase App Template ===${NC}\n"

    # Check if app template exists
    if [ ! -d "$app_dir" ]; then
        echo -e "${RED}App template not found at: $app_dir${NC}"
        echo "Please ensure the template exists in your workspace."
        exit 1
    fi

    # Check if target already exists
    if [ -e "$dest_dir" ]; then
        echo -e "${YELLOW}Target directory already exists: $dest_dir${NC}"
        echo "Please choose a different destination or remove the existing directory."
        exit 1
    fi

    echo -e "${CYAN}Copying from: $app_dir${NC}"
    echo -e "${CYAN}Copying to: $dest_dir${NC}"
    echo ""

    # Copy directory recursively
    cp -r "$app_dir" "$dest_dir"

    echo -e "${GREEN}✓ Template copied successfully!${NC}"
    echo ""

    echo -e "${BLUE}=== Next Steps ===${NC}"
    echo -e "${YELLOW}1.${NC} Update cloudbaserc.json with your Environment ID:"
    echo "   $dest_dir/cloudbaserc.json"
    echo ""
    echo -e "${YELLOW}2.${NC} Install dependencies:"
    echo "   cd $dest_dir"
    echo "   npm install"
    echo ""
    echo -e "${YELLOW}3.${NC} Run development server:"
    echo "   npm run dev"
    echo ""
    echo -e "${YELLOW}4.${NC} Build for production:"
    echo "   npm run build"
}

# Parse arguments
COMMAND="${1:-detect}"
DEST_DIR=""

case "$COMMAND" in
    detect)
        detect
        ;;
    copy-template)
        shift
        while [[ $# -gt 0 ]]; do
            case $1 in
                --dest)
                    DEST_DIR="$2"
                    shift 2
                    ;;
                -h|--help)
                    usage
                    ;;
                *)
                    echo "Unknown option: $1"
                    usage
                    ;;
            esac
        done
        copy_template "$DEST_DIR"
        ;;
    -h|--help)
        usage
        ;;
    *)
        echo "Unknown command: $COMMAND"
        usage
        ;;
esac
