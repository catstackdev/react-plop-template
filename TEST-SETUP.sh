#!/bin/bash

# Test Setup Script for Plop React Generator
# This script will test the global link setup

echo "🧪 Testing Plop React Generator Setup..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if already linked
echo "📋 Step 1: Checking current global links..."
pnpm list --global --depth 0 | grep "@cybercat/plop-generators"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Already globally linked${NC}"
else
    echo -e "${YELLOW}⚠ Not globally linked. Linking now...${NC}"
    pnpm link --global
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Successfully linked globally${NC}"
    else
        echo -e "${RED}✗ Failed to link globally${NC}"
        exit 1
    fi
fi

echo ""
echo "📦 Package is linked globally at:"
pnpm list --global --depth 0 | grep "@cybercat/plop-generators"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. In your React project, run:"
echo "   cd /Users/cybercat/work/react/react-test"
echo "   pnpm link --global @cybercat/plop-generators"
echo ""
echo "2. Test the generator:"
echo "   cybercat-plop component TestButton"
echo "   # or"
echo "   npx plop component TestButton"
echo ""
echo "3. Add to package.json (optional):"
echo '   "scripts": {'
echo '     "g": "cybercat-plop"'
echo '   }'
echo ""
echo "📚 See README.md and INSTALL.md for more details"
