// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "TEMBUSDesignSystem",
    platforms: [
        .iOS(.v15),
        .macOS(.v12)
    ],
    products: [
        .library(
            name: "TEMBUSDesignSystem",
            targets: ["TEMBUSDesignSystem"]
        )
    ],
    targets: [
        .target(
            name: "TEMBUSDesignSystem",
            path: "tokens",
            sources: ["tembus.swift"]
        )
    ]
)
