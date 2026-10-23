#pragma once

#include <aidl/com/seldon/os/telemetry/BnSeldonTelemetryService.h>
#include <android/binder_auto_utils.h>
#include <atomic>
#include <cstdint>
#include <vector>

namespace aidl::com::seldon::os::telemetry {

class SeldonTelemetryService : public BnSeldonTelemetryService {
public:
    SeldonTelemetryService();
    virtual ~SeldonTelemetryService() = default;

    ::ndk::ScopedAStatus getInstantPowerMicroWatts(int64_t* _aidl_return) override;
    ::ndk::ScopedAStatus getThermalHeadroom(int32_t forecastSeconds, float* _aidl_return) override;
    ::ndk::ScopedAStatus setDynamicQuantizationPolicy(int32_t targetBitWidth, bool* _aidl_return) override;
    ::ndk::ScopedAStatus enforceHardeningPolicy(const std::vector<uint8_t>& hardeningToken, int32_t policyFlags, int32_t* _aidl_return) override;
    ::ndk::ScopedAStatus getBinderTransactionRate(int64_t* _aidl_return) override;

private:
    std::atomic<int64_t> mTransactionCounter{0};
    int32_t mCurrentBitWidth{8};
};

} // namespace aidl::com::seldon::os::telemetry
