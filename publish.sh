# publish
# Ask the user which package they want to publish
echo "Which package would you like to publish?"
read package
# Ask the user which version they want to publish
echo "What version do you want to bump?"
read version
# Run documentation script
echo "Running documentation"
npx compodoc -p tsconfig.doc.json --output docs --silent
# Commit the new documentation
git add --all
git commit -m "feat(ngx-$package): Update ngx-$package documentation"
# Navigate to the package folder (currently only works for Angular packages)
cd libs/angular/$package
# Bump the version
npm version $version
# Read the new version
NEW_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')
# Make a new commit for the new version
git add --all
git commit -m "build(ngx-$package):v$NEW_VERSION"
# Tag the new version
git tag -a "@ibenvandeveire/ngx-$package/$NEW_VERSION" -m "New release"
# Push the new version
git push --follow-tags
# Go back to main folder
cd ../../../
# Build the package
echo "Building package"
npm run build "ngx-$package"
# Go to dist folder
cd dist/libs/angular/$package
# Publish the package
npm publish
