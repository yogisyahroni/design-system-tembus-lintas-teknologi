// TEMBUS Design System 0.2.0
// GENERATED FILE. Do not edit by hand.
// Source: tokens/tembus.tokens.json. Run `npm run build` after changing tokens.
import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

public enum TembusColor {
    public static let background = Color(light: 0xF7F8F7, dark: 0x0B120E)
    public static let surface = Color(light: 0xFFFFFF, dark: 0x142019)
    public static let surfaceRaised = Color(light: 0xFFFFFF, dark: 0x1B2921)
    public static let surfaceSubtle = Color(light: 0xEEF3EF, dark: 0x203329)
    public static let foreground = Color(light: 0x14211A, dark: 0xF4F7F5)
    public static let foregroundSecondary = Color(light: 0x415047, dark: 0xD0DBD3)
    public static let foregroundMuted = Color(light: 0x5F6B63, dark: 0xAAB5AE)
    public static let border = Color(light: 0xC7D1CA, dark: 0x4B5D52)
    public static let borderStrong = Color(light: 0x718078, dark: 0x71877A)
    public static let inputBackground = Color(light: 0xFFFFFF, dark: 0x142019)
    public static let inputBorder = Color(light: 0x66756C, dark: 0x71877A)
    public static let focusRing = Color(light: 0x9A3412, dark: 0xFDBA74)
    public static let primary = Color(light: 0x006437, dark: 0x34D399)
    public static let primaryLight = Color(light: 0x007A42, dark: 0x6EE7B7)
    public static let primaryDark = Color(light: 0x003A20, dark: 0x007A42)
    public static let primarySoft = Color(light: 0xE8F5EE, dark: 0x123B25)
    public static let primaryPale = Color(light: 0xF4FBF7, dark: 0x0D3322)
    public static let onPrimary = Color(light: 0xFFFFFF, dark: 0x032318)
    public static let accent = Color(light: 0xC2410C, dark: 0xFB923C)
    public static let accentDark = Color(light: 0x9A3412, dark: 0xC2410C)
    public static let accentLight = Color(light: 0xEA580C, dark: 0xFDBA74)
    public static let accentSoft = Color(light: 0xFFF1E6, dark: 0x4A3210)
    public static let accentPale = Color(light: 0xFFF8F2, dark: 0x3D2414)
    public static let onAccent = Color(light: 0xFFFFFF, dark: 0x241000)
    public static let success = Color(light: 0x15803D, dark: 0x4ADE80)
    public static let onSuccess = Color(light: 0xFFFFFF, dark: 0x032318)
    public static let successSurface = Color(light: 0xDCFCE7, dark: 0x123B25)
    public static let warning = Color(light: 0xB45309, dark: 0xFBBF24)
    public static let onWarning = Color(light: 0xFFFFFF, dark: 0x241000)
    public static let warningSurface = Color(light: 0xFEF3C7, dark: 0x4A3210)
    public static let error = Color(light: 0xB91C1C, dark: 0xF87171)
    public static let onError = Color(light: 0xFFFFFF, dark: 0x2A0808)
    public static let errorSurface = Color(light: 0xFEE2E2, dark: 0x4A1717)
    public static let info = Color(light: 0x1D4ED8, dark: 0x60A5FA)
    public static let onInfo = Color(light: 0xFFFFFF, dark: 0x071A35)
    public static let infoSurface = Color(light: 0xDBEAFE, dark: 0x132E52)
    public static let selection = Color(light: 0xB7E4C7, dark: 0x1A7A4C)
    public static let scrim = Color(light: 0x14211A, dark: 0x000000)
    public static let onPrimaryDark = Color(light: 0xFFFFFF, dark: 0xFFFFFF)
    public static let onAccentLight = Color(light: 0x241000, dark: 0x241000)
    public static let dataviz1 = Color(light: 0x006437, dark: 0x34D399)
    public static let dataviz2 = Color(light: 0xC2410C, dark: 0xFB923C)
    public static let dataviz3 = Color(light: 0x1D4ED8, dark: 0x60A5FA)
    public static let dataviz4 = Color(light: 0x7E22CE, dark: 0xC084FC)
    public static let dataviz5 = Color(light: 0x0E7490, dark: 0x22D3EE)
    public static let dataviz6 = Color(light: 0x5F6B63, dark: 0xAAB5AE)
}

public enum TembusSpacing {
    public static let xs: CGFloat = 4
    public static let sm: CGFloat = 8
    public static let md: CGFloat = 12
    public static let lg: CGFloat = 16
    public static let xl: CGFloat = 20
    public static let xxl: CGFloat = 24
    public static let xxxl: CGFloat = 32
}

public enum TembusRadius {
    public static let sm: CGFloat = 8
    public static let md: CGFloat = 12
    public static let lg: CGFloat = 16
    public static let pill: CGFloat = 999
}

public enum TembusSize {
    public static let minTouchTarget: CGFloat = 48
    public static let controlLarge: CGFloat = 56
    public static let icon: CGFloat = 24
    public static let iconSmall: CGFloat = 16
}

public enum TembusMotion {
    public static let fast: Double = 0.15
    public static let standard: Double = 0.2
    public static let slow: Double = 0.3
    public static let reduced: Double = 0
}

public struct TembusTextStyle {
    public let size: CGFloat
    public let lineHeight: CGFloat
    public let weight: Font.Weight
}

public enum TembusTypography {
    public static let display = TembusTextStyle(size: 36, lineHeight: 39.6, weight: .bold)
    public static let pageTitle = TembusTextStyle(size: 28, lineHeight: 33.6, weight: .bold)
    public static let sectionTitle = TembusTextStyle(size: 20, lineHeight: 30, weight: .bold)
    public static let body = TembusTextStyle(size: 16, lineHeight: 24, weight: .regular)
    public static let bodySmall = TembusTextStyle(size: 14, lineHeight: 21, weight: .regular)
    public static let label = TembusTextStyle(size: 13, lineHeight: 16.3, weight: .semibold)
    public static let caption = TembusTextStyle(size: 12, lineHeight: 18, weight: .medium)
    public static let tableCell = TembusTextStyle(size: 13, lineHeight: 18.2, weight: .regular)
}

public extension View {
    /// Applies a TEMBUS text style (size, weight, and extra line spacing).
    func tembusText(_ style: TembusTextStyle) -> some View {
        self.font(.system(size: style.size, weight: style.weight))
            .lineSpacing(max(0, style.lineHeight - style.size))
    }
}

public extension Color {
    init(light: UInt32, dark: UInt32) {
        #if canImport(UIKit)
        self = Color(UIColor { $0.userInterfaceStyle == .dark ? UIColor(hex: dark) : UIColor(hex: light) })
        #else
        self = Color(hex: light)
        #endif
    }

    init(hex: UInt32) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: 1
        )
    }
}

#if canImport(UIKit)
private extension UIColor {
    convenience init(hex: UInt32) {
        self.init(
            red: CGFloat((hex >> 16) & 0xFF) / 255,
            green: CGFloat((hex >> 8) & 0xFF) / 255,
            blue: CGFloat(hex & 0xFF) / 255,
            alpha: 1
        )
    }
}
#endif
