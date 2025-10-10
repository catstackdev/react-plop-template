#!/bin/bash

# Test Script - Use this in your React project
# Copy this to your React project and run it to test the setup

echo "🧪 Testing Plop Generator Setup in React Project"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Check if package is linked${NC}"
if pnpm list | grep -q "@cybercat/plop-generators"; then
    echo -e "${GREEN}✓ Package is linked in this project${NC}"
    pnpm list | grep "@cybercat/plop-generators"
else
    echo -e "${RED}✗ Package not linked. Run:${NC}"
    echo "  pnpm link --global @cybercat/plop-generators"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 2: Check if cybercat-plop command is available${NC}"
if command -v cybercat-plop &> /dev/null; then
    echo -e "${GREEN}✓ cybercat-plop command found${NC}"
    echo "  Version: $(cybercat-plop --version)"
else
    echo -e "${RED}✗ cybercat-plop command not found${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 3: Test help command${NC}"
cybercat-plop --help > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Help command works${NC}"
else
    echo -e "${RED}✗ Help command failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ All tests passed! You're ready to generate!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}📝 Try these commands:${NC}"
echo ""
echo "  # Interactive mode"
echo "  cybercat-plop"
echo ""
echo "  # Generate component"
echo "  cybercat-plop component Button"
echo ""
echo "  # Generate hook"
echo "  cybercat-plop hook useCounter"
echo ""
echo "  # Generate context"
echo "  cybercat-plop context Auth"
echo ""
echo -e "${YELLOW}💡 Tip: Add to your package.json:${NC}"
echo '  "scripts": {'
echo '    "g": "cybercat-plop"'
echo '  }'
echo ""
echo "  Then use: pnpm g component MyButton"
echo ""
